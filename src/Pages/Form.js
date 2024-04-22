// import { useState } from "react";
// import  { useForm }  from  "react-hook-form";

// const ControlledForm=()=> {
//     const { register, handleSubmit } = useForm();
  
//     function onSubmit(data) {
//       console.log(data); 
//       // { username: 'test', email: 'test', password: 'test' }
//     }
  
//     return (
//       <div >
//         <h4>Signup</h4>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <input
//             name="username"
//             ref={register}
//             placeholder="Username"
            
//           />
//           <input
//             name="email"
//             ref={register}
//             placeholder="Email"
//           />
//           <input
//             name="password"
//             ref={register}
//             placeholder="Password"
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// export default ControlledForm;