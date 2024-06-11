import axios from "axios";

export default function Bt3() {
    let id = 2; // thay bằng id muốn lấy
  axios
    .delete(`http://localhost:3000/students/${id}`)
    .then((result) => console.log(result.data));
  return <div>Bt3</div>;
}
