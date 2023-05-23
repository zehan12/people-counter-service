import { data } from "../opencv"

const getPeopleCount = () => {
    let { peopleCount, timestamp } = data;
    if (peopleCount || peopleCount === 0 ) {
        return {
                "type":"success",
                "message":"Number of  people detected",
                "statusCode":201,
                "count":peopleCount,
                "timestamp":timestamp
            }
    } else {
        return {
                "type":"error",
                "message":"unable to count people",
                "statusCode":400,
                "count":null,
                "timestamp":null
            }  
    }
}

const peopleService = {
    getPeopleCount
}

export default peopleService;