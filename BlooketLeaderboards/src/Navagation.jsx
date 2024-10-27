import './Navagation.css';

export function NavBar() {
  return (
    <>
      <nav>
        <div id="nav-bar" className="flex v-center">
          <a href="/"> Home </a>
          <a href="/gamemodes"> Gamemodes </a>
          <a href="/submissions"> Submissions </a>
          <a href="/settings"> Settings </a>
          <a href="/privacy-policy"> Privacy Policy </a>
          <a href="https://discord.gg/5nYGQtqyBZ"> Discord </a>
        </div>
      </nav>
    </>
  );
}