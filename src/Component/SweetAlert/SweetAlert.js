import SweetAlert from "react-bootstrap-sweetalert";
function SweetAlertComponent({ confirm, cancle, title, subtitle, type }) {
  return (
    <SweetAlert
      style={{ zIndex: "1" }}
      title={title}
      onConfirm={confirm}
      // type="danger"
      type={type !== undefined ? type : "danger"}
      showCancel={true}
      confirmBtnStyle={{ backgroundColor: "#024b98" }}
      onCancel={cancle}
    >
      <h5> {subtitle} </h5>
    </SweetAlert>
  );
}

export default SweetAlertComponent;


// const sendData = async (e) => {
//   e.preventDefault();
//   const data = { first_name: user.first_name, last_name: user.last_name,email:user.email,password:user.password };
//   try {
//     const response = await fetch('https://wtsacademy.dedicateddevelopers.us/api/user/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/data');
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };