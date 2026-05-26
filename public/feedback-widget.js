/* Feedback widget for userjourney.html
 * - Reviewer identity stored in localStorage (name + stable per-browser id)
 * - Review-mode toggle, per-stage Approve/Changes-required, per-step comments
 * - Flat comments (no threads), add/edit/delete/resolve/reopen
 * - Summary panel with counts, jump-to-open, copy-for-Claude, export-to-markdown
 * Stage/step IDs are derived from existing .chapter-num / .step-num text — no HTML rewrite needed.
 */
(function () {
  "use strict";

  var LS_NAME = "fb_reviewer_name";
  var LS_ID = "fb_reviewer_id";
  var LS_MODE = "fb_review_mode";
  var LS_DRAFT_PREFIX = "fb_draft_";

  var STATUS_LABEL = {
    pending: "Pending",
    approved: "Approved",
    changes_required: "Changes required",
  };

  /** in-memory mirror of /api/feedback */
  var state = { version: 1, stages: {}, comments: [] };

  // ---------- identity ----------
  function getReviewer() {
    var name = localStorage.getItem(LS_NAME);
    var id = localStorage.getItem(LS_ID);
    if (!id) {
      id = "rv_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(LS_ID, id);
    }
    return { name: name || "", id: id };
  }
  function setReviewerName(name) {
    localStorage.setItem(LS_NAME, name);
  }
  function initials(name) {
    var parts = (name || "?").trim().split(/\s+/);
    return ((parts[0] || "")[0] || "?").toUpperCase() + ((parts[1] || "")[0] || "").toUpperCase();
  }

  // ---------- dom helpers ----------
  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        if (k === "class") node.className = props[k];
        else if (k === "text") node.textContent = props[k];
        else if (k === "html") node.innerHTML = props[k];
        else if (k.indexOf("on") === 0 && typeof props[k] === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), props[k]);
        } else if (props[k] != null) node.setAttribute(k, props[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function fmtTime(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    return d.toLocaleString(undefined, {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    });
  }

  var toastTimer;
  function toast(msg, isError) {
    var t = document.getElementById("fb-toast");
    if (!t) {
      t = el("div", { id: "fb-toast", class: "fb-toast" });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "fb-toast" + (isError ? " fb-error" : "");
    requestAnimationFrame(function () { t.classList.add("fb-visible"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("fb-visible"); }, 2600);
  }

  // ---------- api ----------
  function api(method, url, body) {
    var rv = getReviewer();
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-reviewer-name": rv.name || "Anonymous Reviewer",
        "x-reviewer-email": rv.id,
      },
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (j) {
          throw new Error(j.error || ("Request failed (" + res.status + ")"));
        });
      }
      if (res.status === 204) return null;
      return res.json();
    });
  }

  function loadState() {
    return api("GET", "/api/feedback").then(function (data) {
      state = data || state;
      renderAll();
    }).catch(function (e) {
      toast("Could not load feedback: " + e.message, true);
    });
  }

  // ---------- page scanning ----------
  function stageNodes() {
    var nodes = [];
    document.querySelectorAll("section.chapter").forEach(function (sec) {
      var numEl = sec.querySelector(".chapter-num");
      if (!numEl) return;
      var num = numEl.textContent.trim();
      var titleEl = sec.querySelector(".chapter-header h2");
      nodes.push({
        id: "chapter-" + num,
        title: titleEl ? titleEl.textContent.trim() : "Chapter " + num,
        section: sec,
        anchor: sec.querySelector(".chapter-header"),
      });
    });
    var branch = document.querySelector(".branch");
    if (branch) {
      nodes.push({ id: "chapter-fork", title: "The fork — pass / fail", section: branch, anchor: null, isFork: true });
    }
    return nodes;
  }

  function stepNodesIn(section) {
    var steps = [];
    section.querySelectorAll("article.step").forEach(function (art) {
      var numEl = art.querySelector(".step-num");
      if (!numEl) return;
      steps.push({ id: numEl.textContent.trim(), article: art });
    });
    return steps;
  }

  // ---------- comment selectors ----------
  function commentsForStep(stepId) {
    return state.comments.filter(function (c) { return c.scope === "step" && c.stepId === stepId; });
  }
  function commentsForStage(stageId) {
    return state.comments.filter(function (c) { return c.scope === "stage" && c.stageId === stageId; });
  }
  function openCount(list) {
    return list.filter(function (c) { return !c.resolved; }).length;
  }

  // ---------- render: toolbar ----------
  function renderToolbar() {
    var mount = document.getElementById("fb-toolbar");
    if (!mount) return;
    mount.innerHTML = "";
    var rv = getReviewer();
    var on = isReviewOn();

    var reviewerBtn = el("button", {
      class: "fb-reviewer", type: "button", title: "Change your reviewer name",
      onclick: promptReviewerName,
    }, [
      el("span", { class: "fb-avatar", text: initials(rv.name) }),
      el("span", { text: rv.name || "Set your name" }),
    ]);

    var modeBtn = el("button", {
      class: "fb-mode", type: "button", "aria-pressed": on ? "true" : "false",
      onclick: toggleMode,
    }, [
      el("span", { class: "fb-dot" }),
      el("span", { text: on ? "Review mode: ON" : "Review mode" }),
    ]);

    mount.appendChild(el("div", { class: "fb-toolbar" }, [reviewerBtn, modeBtn]));
  }

  function isReviewOn() { return localStorage.getItem(LS_MODE) === "1"; }
  function toggleMode() {
    var rv = getReviewer();
    if (!isReviewOn() && !rv.name) {
      promptReviewerName(function () { setMode(true); });
      return;
    }
    setMode(!isReviewOn());
  }
  function setMode(on) {
    localStorage.setItem(LS_MODE, on ? "1" : "0");
    document.body.classList.toggle("fb-review-on", on);
    renderToolbar();
  }

  // ---------- render: stage strips ----------
  function renderStages() {
    stageNodes().forEach(function (stage) {
      var strip = stage.section.querySelector(":scope > .fb-stage-strip");
      if (!strip) {
        strip = el("div", { class: "fb-stage-strip", "data-stage-id": stage.id });
        if (stage.isFork) {
          stage.section.parentNode.insertBefore(strip, stage.section);
        } else if (stage.anchor) {
          stage.anchor.insertAdjacentElement("afterend", strip);
        } else {
          stage.section.insertBefore(strip, stage.section.firstChild);
        }
      }
      strip.innerHTML = "";

      var s = state.stages[stage.id] || { status: "pending" };
      var open = openCount(commentsForStage(stage.id)) + sumStepOpen(stage.section);

      var meta = el("div", { class: "fb-stage-meta" }, [
        el("span", { class: "fb-stage-status " + s.status, text: STATUS_LABEL[s.status] || "Pending" }),
        open > 0 ? el("span", { text: open + " open comment" + (open === 1 ? "" : "s") }) : null,
        s.statusBy ? el("span", { class: "fb-ts", text: "by " + (s.statusByName || s.statusBy) + " · " + fmtTime(s.statusAt) }) : null,
        s.statusNote ? el("span", { text: "“" + s.statusNote + "”" }) : null,
      ]);

      var actions = el("div", { class: "fb-stage-actions" }, [
        el("button", {
          class: "fb-btn fb-approve", type: "button",
          onclick: function () { setStage(stage, "approved"); },
        }, ["✓ Approve"]),
        el("button", {
          class: "fb-btn fb-changes", type: "button",
          onclick: function () { promptChanges(stage); },
        }, ["⚠ Request changes"]),
        el("button", {
          class: "fb-btn fb-ghost", type: "button",
          onclick: function () { addStageComment(stage); },
        }, ["＋ Stage note"]),
        s.status !== "pending"
          ? el("button", { class: "fb-btn fb-link", type: "button", onclick: function () { setStage(stage, "pending"); } }, ["Clear"])
          : null,
      ]);

      strip.appendChild(meta);
      strip.appendChild(actions);

      // stage-level comments render under the strip
      var sc = commentsForStage(stage.id);
      if (sc.length) {
        var holder = el("div", { class: "fb-step-thread", style: "display:flex" });
        sc.forEach(function (c) { holder.appendChild(renderComment(c)); });
        strip.insertAdjacentElement("afterend", holder);
      }
    });
  }

  function sumStepOpen(section) {
    var total = 0;
    stepNodesIn(section).forEach(function (st) { total += openCount(commentsForStep(st.id)); });
    return total;
  }

  function setStage(stage, status, note) {
    api("PUT", "/api/feedback/stages/" + encodeURIComponent(stage.id), {
      status: status, statusNote: note || null, title: stage.title,
    }).then(function (s) {
      state.stages[stage.id] = s;
      renderStages();
      renderPanel();
      toast(status === "approved" ? "Stage approved" : status === "changes_required" ? "Changes requested" : "Status cleared");
    }).catch(function (e) { toast(e.message, true); });
  }

  // ---------- render: step threads ----------
  function renderSteps() {
    stageNodes().forEach(function (stage) {
      if (stage.isFork) return;
      stepNodesIn(stage.section).forEach(function (step) {
        var thread = step.article.querySelector(":scope > .fb-step-thread");
        if (!thread) {
          thread = el("div", { class: "fb-step-thread", "data-step-id": step.id });
          step.article.appendChild(thread);
        }
        thread.innerHTML = "";

        var list = commentsForStep(step.id);
        var open = openCount(list);
        var head = el("div", { class: "fb-thread-head" }, [
          el("span", { class: "fb-count" }, [
            el("span", { text: "Comments" }),
            list.length ? el("span", { class: "fb-badge", text: String(open) }) : null,
          ]),
          el("div", {}, [
            list.some(function (c) { return c.resolved; })
              ? el("button", { class: "fb-btn fb-link", type: "button", onclick: function () { thread.classList.toggle("fb-show-resolved"); renderSteps(); } }, ["Toggle resolved"])
              : null,
            el("button", {
              class: "fb-btn", type: "button",
              onclick: function () { openEditor(thread, null, { scope: "step", stageId: stage.id, stepId: step.id }); },
            }, ["＋ Add"]),
          ]),
        ]);
        thread.appendChild(head);

        var showResolved = thread.classList.contains("fb-show-resolved");
        list.forEach(function (c) {
          if (c.resolved && !showResolved) return;
          thread.appendChild(renderComment(c));
        });
        // restore draft if present
        var draft = localStorage.getItem(LS_DRAFT_PREFIX + step.id);
        if (draft) openEditor(thread, null, { scope: "step", stageId: stage.id, stepId: step.id }, draft);
      });
    });
  }

  function addStageComment(stage) {
    var strip = stage.section.parentNode && stage.isFork
      ? stage.section.previousElementSibling
      : stage.section.querySelector(":scope > .fb-stage-strip");
    if (!strip) return;
    var holder = strip.nextElementSibling && strip.nextElementSibling.classList.contains("fb-step-thread")
      ? strip.nextElementSibling
      : (function () {
          var h = el("div", { class: "fb-step-thread", style: "display:flex" });
          strip.insertAdjacentElement("afterend", h);
          return h;
        })();
    openEditor(holder, null, { scope: "stage", stageId: stage.id, stepId: null });
  }

  // ---------- render: single comment ----------
  function renderComment(c) {
    var rv = getReviewer();
    var mine = c.author === rv.id;
    var node = el("div", { class: "fb-comment" + (c.resolved ? " fb-resolved" : "") });

    node.appendChild(el("div", { class: "fb-comment-head" }, [
      el("span", { class: "fb-author", text: c.authorName || "Reviewer" }),
      el("span", { class: "fb-ts", text: fmtTime(c.createdAt) + (c.edited ? " (edited)" : "") }),
    ]));
    node.appendChild(el("div", { class: "fb-comment-text", text: c.text }));

    if (c.resolved && c.resolutionNote) {
      node.appendChild(el("div", { class: "fb-resolution-note" }, [
        el("strong", { text: "Resolved: " }),
        el("span", { text: c.resolutionNote + " — " + (c.resolvedByName || "") }),
      ]));
    }

    var actions = el("div", { class: "fb-comment-actions" });
    if (!c.resolved) {
      actions.appendChild(el("button", { class: "fb-btn fb-link", type: "button", onclick: function () { resolve(c); } }, ["✓ Resolve"]));
    } else {
      actions.appendChild(el("button", { class: "fb-btn fb-link", type: "button", onclick: function () { reopen(c); } }, ["↺ Reopen"]));
    }
    if (mine && !c.resolved) {
      actions.appendChild(el("button", { class: "fb-btn fb-link", type: "button", onclick: function () { startEdit(node, c); } }, ["Edit"]));
      actions.appendChild(el("button", { class: "fb-btn fb-link", type: "button", onclick: function () { del(c); } }, ["Delete"]));
    }
    node.appendChild(actions);
    return node;
  }

  // ---------- editor (add / edit) ----------
  function openEditor(container, replaceNode, target, draftText) {
    var existing = container.querySelector(".fb-editor");
    if (existing && !replaceNode) { existing.querySelector("textarea").focus(); return; }

    var ta = el("textarea", { placeholder: "Write a note for this " + (target.scope === "stage" ? "stage" : "step") + "…", maxlength: "2000" });
    if (draftText) ta.value = draftText;
    var counter = el("span", { class: "fb-counter", text: ta.value.length + "/2000" });
    ta.addEventListener("input", function () {
      counter.textContent = ta.value.length + "/2000";
      if (target.scope === "step" && target.stepId) {
        if (ta.value) localStorage.setItem(LS_DRAFT_PREFIX + target.stepId, ta.value);
        else localStorage.removeItem(LS_DRAFT_PREFIX + target.stepId);
      }
    });

    var editor = el("div", { class: "fb-editor" }, [
      ta,
      el("div", { class: "fb-editor-actions" }, [
        counter,
        el("button", { class: "fb-btn fb-ghost", type: "button", onclick: function () {
          if (target.scope === "step" && target.stepId) localStorage.removeItem(LS_DRAFT_PREFIX + target.stepId);
          editor.remove();
        } }, ["Cancel"]),
        el("button", { class: "fb-btn fb-approve", type: "button", onclick: function () { submit(); } }, ["Save"]),
      ]),
    ]);

    function submit() {
      var text = ta.value.trim();
      if (!text) { toast("Comment is empty", true); return; }
      var rv = getReviewer();
      if (!rv.name) { promptReviewerName(function () { submit(); }); return; }
      api("POST", "/api/feedback/comments", {
        scope: target.scope, stageId: target.stageId, stepId: target.stepId, text: text,
      }).then(function (c) {
        state.comments.push(c);
        if (target.scope === "step" && target.stepId) localStorage.removeItem(LS_DRAFT_PREFIX + target.stepId);
        editor.remove();
        renderAll();
        toast("Comment added");
      }).catch(function (e) { toast(e.message, true); });
    }

    container.appendChild(editor);
    ta.focus();
  }

  function startEdit(node, c) {
    var ta = el("textarea", { maxlength: "2000" });
    ta.value = c.text;
    var counter = el("span", { class: "fb-counter", text: ta.value.length + "/2000" });
    ta.addEventListener("input", function () { counter.textContent = ta.value.length + "/2000"; });
    var editor = el("div", { class: "fb-editor" }, [
      ta,
      el("div", { class: "fb-editor-actions" }, [
        counter,
        el("button", { class: "fb-btn fb-ghost", type: "button", onclick: function () { renderAll(); } }, ["Cancel"]),
        el("button", { class: "fb-btn fb-approve", type: "button", onclick: function () {
          var text = ta.value.trim();
          if (!text) { toast("Comment is empty", true); return; }
          api("PATCH", "/api/feedback/comments/" + encodeURIComponent(c.id), { text: text }).then(function (u) {
            var i = state.comments.findIndex(function (x) { return x.id === c.id; });
            if (i > -1) state.comments[i] = u;
            renderAll();
            toast("Comment updated");
          }).catch(function (e) { toast(e.message, true); });
        } }, ["Save"]),
      ]),
    ]);
    node.innerHTML = "";
    node.appendChild(editor);
    ta.focus();
  }

  function del(c) {
    if (!window.confirm("Delete this comment? This cannot be undone.")) return;
    api("DELETE", "/api/feedback/comments/" + encodeURIComponent(c.id)).then(function () {
      state.comments = state.comments.filter(function (x) { return x.id !== c.id; });
      renderAll();
      toast("Comment deleted");
    }).catch(function (e) { toast(e.message, true); });
  }

  function resolve(c) {
    var note = window.prompt("Resolution note (optional):", "") || null;
    api("POST", "/api/feedback/comments/" + encodeURIComponent(c.id) + "/resolve", { resolutionNote: note }).then(function (u) {
      var i = state.comments.findIndex(function (x) { return x.id === c.id; });
      if (i > -1) state.comments[i] = u;
      renderAll();
      toast("Comment resolved");
    }).catch(function (e) { toast(e.message, true); });
  }

  function reopen(c) {
    api("POST", "/api/feedback/comments/" + encodeURIComponent(c.id) + "/reopen").then(function (u) {
      var i = state.comments.findIndex(function (x) { return x.id === c.id; });
      if (i > -1) state.comments[i] = u;
      renderAll();
      toast("Comment reopened");
    }).catch(function (e) { toast(e.message, true); });
  }

  // ---------- summary panel ----------
  function renderPanel() {
    var panel = document.getElementById("fb-panel");
    if (!panel) {
      panel = el("div", { id: "fb-panel", class: "fb-panel" });
      document.body.appendChild(panel);
    }
    panel.innerHTML = "";

    var stages = stageNodes();
    var counts = { approved: 0, changes_required: 0, pending: 0 };
    stages.forEach(function (st) {
      var s = (state.stages[st.id] && state.stages[st.id].status) || "pending";
      counts[s] = (counts[s] || 0) + 1;
    });
    var openC = state.comments.filter(function (c) { return !c.resolved; }).length;
    var resolvedC = state.comments.filter(function (c) { return c.resolved; }).length;

    panel.appendChild(el("h4", { text: "Review summary" }));
    panel.appendChild(el("div", { class: "fb-stats" }, [
      statRow("✓ Approved", counts.approved),
      statRow("⚠ Changes req.", counts.changes_required),
      statRow("⏳ Pending", counts.pending),
      statRow("Open comments", openC),
      statRow("Resolved", resolvedC),
    ]));

    // jump-to-open
    var jumps = el("div", { class: "fb-jumps" });
    var anyOpen = false;
    stages.forEach(function (st) {
      stepNodesIn(st.section).forEach(function (step) {
        var o = openCount(commentsForStep(step.id));
        if (o > 0) {
          anyOpen = true;
          jumps.appendChild(el("a", { href: "#", onclick: function (e) { e.preventDefault(); scrollToStep(step.id); } }, [
            el("span", { text: "Step " + step.id }),
            el("span", { class: "fb-badge", text: String(o) }),
          ]));
        }
      });
    });
    if (anyOpen) {
      panel.appendChild(el("h4", { text: "Jump to open" }));
      panel.appendChild(jumps);
    }

    panel.appendChild(el("div", { class: "fb-actions" }, [
      el("button", { class: "fb-btn", type: "button", onclick: copyForClaude }, ["📋 Copy for Claude"]),
      el("button", { class: "fb-btn fb-ghost", type: "button", onclick: exportMarkdown }, ["↓ Export .md"]),
    ]));
  }

  function statRow(label, n) {
    return el("div", { class: "fb-row" }, [el("span", { text: label }), el("b", { text: String(n) })]);
  }

  function scrollToStep(stepId) {
    var nodes = document.querySelectorAll("article.step .step-num");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].textContent.trim() === stepId) {
        nodes[i].closest("article.step").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }
  }

  // ---------- markdown export (the Claude-readable punch list) ----------
  function buildMarkdown() {
    var lines = ["# User-journey review feedback", "", "_Generated " + new Date().toISOString() + "_", ""];
    var stages = stageNodes();

    var changes = stages.filter(function (st) {
      return state.stages[st.id] && state.stages[st.id].status === "changes_required";
    });
    lines.push("## Stages requiring changes (" + changes.length + ")", "");
    if (!changes.length) lines.push("_None._", "");
    changes.forEach(function (st) {
      var s = state.stages[st.id];
      lines.push("- **" + st.id + "** — " + st.title + (s.statusNote ? " — _" + s.statusNote + "_" : ""));
    });
    lines.push("");

    var open = state.comments.filter(function (c) { return !c.resolved; });
    lines.push("## Open comments (" + open.length + ")", "");
    if (!open.length) lines.push("_None._", "");
    open.forEach(function (c) {
      var loc = c.scope === "stage" ? c.stageId + " (stage)" : "step " + c.stepId;
      lines.push("- [ ] **" + loc + "** — " + c.text + " _(" + (c.authorName || "reviewer") + ")_  \\\n  `" + c.id + "`");
    });
    lines.push("");

    lines.push("## How to act on this", "",
      "Read `data/feedback.json`. For each open comment, edit `public/userjourney.html` (or the referenced source), then mark it resolved with:",
      "",
      "```",
      "POST /api/feedback/comments/<id>/resolve  { \"resolutionNote\": \"<what you changed>\" }",
      "```",
      "");
    return lines.join("\n");
  }

  function copyForClaude() {
    var md = buildMarkdown();
    navigator.clipboard.writeText(md).then(function () {
      toast("Punch list copied — paste it to Claude");
    }).catch(function () {
      window.prompt("Copy this:", md);
    });
  }

  function exportMarkdown() {
    var md = buildMarkdown();
    var blob = new Blob([md], { type: "text/markdown" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: "feedback-" + new Date().toISOString().slice(0, 10) + ".md" });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ---------- modals ----------
  function promptReviewerName(after) {
    var rv = getReviewer();
    var input = el("input", { type: "text", value: rv.name || "", placeholder: "e.g. Vijay Kumar" });
    var back = el("div", { class: "fb-modal-back" }, [
      el("div", { class: "fb-modal" }, [
        el("h3", { text: "Who's reviewing?" }),
        el("p", { text: "Your name is shown next to comments and approvals. Stored in this browser only." }),
        el("label", {}, [el("span", { text: "Reviewer name" }), input]),
        el("div", { class: "fb-modal-actions" }, [
          el("button", { class: "fb-btn fb-ghost", type: "button", onclick: function () { back.remove(); } }, ["Cancel"]),
          el("button", { class: "fb-btn fb-approve", type: "button", onclick: function () {
            var name = input.value.trim();
            if (!name) { toast("Please enter a name", true); return; }
            setReviewerName(name);
            back.remove();
            renderToolbar();
            if (typeof after === "function") after();
          } }, ["Save"]),
        ]),
      ]),
    ]);
    back.addEventListener("click", function (e) { if (e.target === back) back.remove(); });
    document.body.appendChild(back);
    input.focus();
  }

  function promptChanges(stage) {
    var input = el("textarea", { placeholder: "What needs to change? (optional but recommended)", rows: "3" });
    var back = el("div", { class: "fb-modal-back" }, [
      el("div", { class: "fb-modal" }, [
        el("h3", { text: "Request changes" }),
        el("p", { text: stage.title }),
        el("label", {}, [el("span", { text: "Reason" }), input]),
        el("div", { class: "fb-modal-actions" }, [
          el("button", { class: "fb-btn fb-ghost", type: "button", onclick: function () { back.remove(); } }, ["Cancel"]),
          el("button", { class: "fb-btn fb-changes", type: "button", onclick: function () {
            var rv = getReviewer();
            if (!rv.name) { back.remove(); promptReviewerName(function () { promptChanges(stage); }); return; }
            setStage(stage, "changes_required", input.value.trim() || null);
            back.remove();
          } }, ["Request changes"]),
        ]),
      ]),
    ]);
    back.addEventListener("click", function (e) { if (e.target === back) back.remove(); });
    document.body.appendChild(back);
    input.focus();
  }

  // ---------- orchestration ----------
  function renderAll() {
    renderStages();
    renderSteps();
    renderPanel();
  }

  function init() {
    document.body.classList.toggle("fb-review-on", isReviewOn());
    renderToolbar();
    loadState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
