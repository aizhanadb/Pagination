import { useState, useEffect } from "react";
import DisplayFollowers from "./DisplayFollowers";
import Pagination from "./Paginate";

function FetchFollowers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [nPages, setnPages] = useState(0);

  //functions
  const fetchApi = async () => {
    setLoading(true);
    try {
      const url =
        "https://api.github.com/users/john-smilga/followers?per_page=100";
      const req = await fetch(url);
      const res = await req.json();
      setFollowers(res);
      // const nPages = Math.ceil(followers.length / dataPerPage);
      // setnPages(nPages);
    } catch (err) {
      console.error("Error fetching data");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  //function for creating numbers of followers to show in the UI
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  let followersPerPage = followers.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(followers.length / dataPerPage);
  let pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  //function for changing the state of the currentNumber and followers to show
  const clickNumber = (num) => {
    setCurrentPage(num);
  };
  const clickPrev = (nums) => {
    if (currentPage === pageNumbers[0]) {
      setCurrentPage(pageNumbers.length);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const clickNext = () => {
    if (currentPage === pageNumbers.length) {
      setCurrentPage(pageNumbers[0]);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {loading ? (
        <header>
          <div className="section-title">
            <h1>Loading..</h1>
            <div className="underline"></div>
          </div>
        </header>
      ) : (
        <>
          <main>
            <div className="section-title">
              <h1>pagination</h1>
              <div className="underline"></div>
            </div>
            <section className="followers">
              <div className="container">
                {followersPerPage.map((follower) => {
                  return (
                    <DisplayFollowers key={follower.id} follower={follower} />
                  );
                })}
              </div>
              <Pagination
                pageNumbers={pageNumbers}
                clickNumber={clickNumber}
                currentPage={currentPage}
                clickPrev={clickPrev}
                clickNext={clickNext}
              />
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default FetchFollowers;
