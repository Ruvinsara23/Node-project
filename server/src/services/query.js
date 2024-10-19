const DEFALT_PAGE_LIMIT=0;
const DEFALT_PAGE_NUMBER=1

function getPagination (query){
const page=Math.abs(query.page)|| DEFALT_PAGE_NUMBER ;   
const limit=Math.abs(query.limit) || DEFALT_PAGE_LIMIT;
const skip=(page-1)*limit;

return {
    skip,
    limit,
}
}

module.exports = {
    getPagination
}