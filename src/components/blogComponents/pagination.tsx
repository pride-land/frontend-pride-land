interface Props {
    blogsPerPage: number,
    length: number,
    handlePagination: any
}
const Pagination: React.FC<Props> = (props) => {
   
    const paginationNumbers = [];
    for (let i=1; i <= Math.ceil(props.length / props.blogsPerPage); i++) {
        paginationNumbers.push(i);
    }

  return (
    <div id='pagination' className="mt-auto flex justify-center">
        {paginationNumbers.map((pageNumber) => (
       
            <button className='m-[.08rem] text-md w-6 bg-white rounded' key={pageNumber} onClick={() => props.handlePagination(pageNumber)}>
                {pageNumber}
            </button>
  
        ))}
    </div>
  )
}

export default Pagination