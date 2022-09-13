import React, { useState, useEffect } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux'
// pass in the id of a component, get the style settings of it from redux, then render them, so user can change styles
// the style settings looks like this:
// settings = {
//     style1: {color1: "#000", color2: "#222"},
//     style2: {color1: "#000", color2: "#222"},
// }
export const RenderOperating = (id) => { // 这里传进来的是id
    
    const selector = useSelector(state=>state.selector); //状态
    const dispatch = useDispatch(); //改变状态的方法
    // const [styles, setStyles] = useState({/*get style settings from redux*/});
    // useEffect(() => {
        // change the style settings of the component in the redux
    // }, [styles]);
    
    return (
        <OperateArea>{() => {
            for (let styleGroup in selector.currentSettings.keys()) {
                return (
                    <StyleGroup>
                        <StyleGroupTitle>{styleGroup}</StyleGroupTitle>
                        {(styleGroup) => {
                            for (let styleItem in styles[styleGroup].keys()) {
                                return (
                                    <StyleItem>
                                        <StyleItemTitle>{styleItem}</StyleItemTitle>
                                        <Input value={styles[styleGroup][styleItem]} onBlur={(e) => { // 在这里怎么把获取到的新值传给redux捏尼尼尼你直接写  调用dispatch函数呀
                                            // setStyles((prev) => { // 未验证格式
                                            //     let newStyles = JSON.parse(JSON.stringify(prev));
                                            //     newStyles[styleGroup][styleItem] = e.target.value;
                                            //     return newStyles;
                                            // })
                                            dispatch(updateSelectComponent({
                                                ...selector,
                                                currentSettings: { /**新值 */},
                                            }))
                                        }}/>
                                    </StyleItem>
                                );
                            }
                        }}
                    </StyleGroup>
                )
            }
        }}</OperateArea>

};

const OperateArea = styled.div``;







// import React from "react";

// export const RenderOperating = ({ obj }) => {
//   let keys1 = Array(100)
//     .fill(0)
//     .map(() => Array(100).fill(0));
//   for (let key1 in obj) {
//     keys1.push(key1);
//     console.log(key1);
//     for (let key2 in obj[key1]) {
//       keys1[key1].push(key2);
//       console.log(key2);
//       //   values2.push(obj[key1][key2]);
//       console.log(obj[key1][key2]);
//     }
//   }
//   console.log(keys1);
//   return keys1.map((key1) => {
//     return (
//       <>
//         <div>{key1}</div>
//         <div>
//           {keys1[key1].map((key2) => {
//             return (
//               <>
//                 <div>{key2}</div>
//                 <div>{obj[key1][key2]}</div>
//               </>
//             );
//           })}
//         </div>
//       </>
//     );
//   });
// };
