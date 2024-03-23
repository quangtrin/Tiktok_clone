import axios from "axios";
import config from "~/config";
import Swal from 'sweetalert2';

const tokenSession = localStorage.getItem('token');
const getListVideos = async () => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/video`);
        return response.data.videos;
    } catch (error) {
        console.log(error);
    }
}

const getListVideosByCreatorId = async (creatorId) => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/video/creator/${creatorId}`);
        return response.data.videos;
    } catch (error) {
        console.log(error);
    }
}



const createVideo = async (video, description, song) => {
    try {
        const formData = new FormData();
        formData.append('video', video);
        formData.append('description', description);
        formData.append('song', song);
        const res = await axios.post(`${config.baseUrl}/api/video/upload`, formData, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.status;
    } catch (error) {
        console.log(error);
    }
}

export { getListVideos, createVideo, getListVideosByCreatorId };