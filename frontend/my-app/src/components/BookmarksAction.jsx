import axios from "axios";
import { USER_API_ENDPOINT } from "./utils/constant";
import { setBookmarks } from "./Redux/bookmarkSlice";
import { toast } from "sonner";

export const toggleBookmark = (jobId) => async (dispatch) => {
  try {
    const res = await axios.post(`${USER_API_ENDPOINT}/bookmark/${jobId}`,{},{withCredentials:true});
    console.log("call")
    if (res.data.success) {
      dispatch(setBookmarks(res.data.bookmarks));
      toast.success("Bookmark Updated Successfully")
    }
  } catch (error) {
    console.error(error);
    toast.error("Error Occured");
  }
};

export const fetchBookmarks = (userId) => async (dispatch) => {
  try {
    console.log(userId);
    const res = await axios.get(`${USER_API_ENDPOINT}/my-bookmarks/${userId}`,{withCredentials:true});
    dispatch(setBookmarks(res.data.bookmarks));
  } catch (error) {
    console.error(error);
  }
};
