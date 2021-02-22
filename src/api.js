import axios from 'axios';

const boardList = async (api) => {
    axios.get(api);
}



export default {
    'boardList' : boardList
} 