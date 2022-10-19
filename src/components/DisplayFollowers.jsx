function DisplayFollowers({ follower }) {
  return (
    <article key={follower.id} className="card">
      <img src={follower.avatar_url} alt="person" />
      <h4>{follower.login}</h4>
      <a target="_blank" href={follower.html_url} className="btn">
        view profile
      </a>
    </article>
  );
}

export default DisplayFollowers;
