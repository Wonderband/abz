import axios from "axios";

const axIstance = axios.create({
  baseURL: "http://frontend-test-assignment-api.abz.agency/api/v1/",
});

export async function getUsersFromAPI(paramObj) {
  return await axIstance.get("users", { params: paramObj });
}
