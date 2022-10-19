function Pagination({
  pageNumbers,
  clickNumber,
  clickPrev,
  clickNext,
  currentPage
}) {
  return (
    <div className="btn-container">
      <button onClick={clickPrev} className="prev-btn">
        prev
      </button>

      {pageNumbers.map((number, index) => {
        return (
          <>
            {number === currentPage ? (
              <button
                key={index}
                onClick={() => clickNumber(number)}
                className="page-btn active-btn"
                data-index={index}
              >
                {number}
              </button>
            ) : (
              <button
                key={index}
                onClick={() => clickNumber(number)}
                className="page-btn"
                data-index={index}
              >
                {number}
              </button>
            )}
          </>
        );
      })}
      <button onClick={clickNext} className="next-btn">
        next
      </button>
    </div>
  );
}

export default Pagination;
