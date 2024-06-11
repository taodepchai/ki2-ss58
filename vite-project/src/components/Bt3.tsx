import axios from "axios";

export default function Bt3() {
    let id = 1; // thay bằng id muốn lấy
  axios
    .get(`http://localhost:3000/students/${id}`)
    .then((result) => console.log(result.data));
  return <div>Bt3</div>;
}
