import axios from "axios";

const axIstance = axios.create({
  baseURL: "http://frontend-test-assignment-api.abz.agency/api/v1/",
});

export async function getUsersFromAPI(paramObj) {
  return await axIstance.get("users", { params: paramObj });
}

// export async function getAllArticles(category, params) {
//   if (category === "financial_guide")
//     return await axIstance.get(category, params);
//   else return await axIstance.get(`category/${category}`, params);
// }

// export async function getArticleById(artId) {
//   return await axIstance.get(`article/${artId}`);
// }
