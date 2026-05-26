type Session = {
  day: string;
  month: string;
  weekday: string;
  time: string;
  live?: boolean;
  title: string;
  meta: string;
};

const sessions: Session[] = [
  {
    day: "15",
    month: "MAY",
    weekday: "WED",
    time: "10:00 AM – 12:00 PM",
    live: true,
    title: "Project Scope Management",
    meta: "Rohit Sharma",
  },
  {
    day: "17",
    month: "MAY",
    weekday: "FRI",
    time: "12:30 PM – 01:30 PM",
    title: "Practice Quiz",
    meta: "Scope Management Quiz 1",
  },
  {
    day: "20",
    month: "MAY",
    weekday: "MON",
    time: "03:00 PM – 04:00 PM",
    title: "Assignment Due",
    meta: "Risk Management Plan",
  },
];

export default function NextSessions() {
  return (
    <div className="next-sessions">
      <div className="card-head">
        <h3>Next 3 Sessions</h3>
        <a href="#">View full calendar <i className="fa-solid fa-arrow-right"></i></a>
      </div>
      <ul className="session-list">
        {sessions.map((s) => (
          <li key={s.day + s.title}>
            <div className="date-pill">
              <span className="m">{s.month}</span>
              <strong>{s.day}</strong>
              <span className="wd">{s.weekday}</span>
            </div>
            <div className="ns-body">
              <div className="ns-time">
                <span>{s.time}</span>
                {s.live && <span className="live">Live</span>}
              </div>
              <strong>{s.title}</strong>
              <small>{s.meta}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
