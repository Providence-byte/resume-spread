/**
 * @desc 获取两个节点的距离
 * @param1 Node
 * @param2 Node
 */

const getOffset = (n1, n2) => {
  if (!n1 || !n2) return;
  let rect1 = n1.getBoundingClientRect();
  let rect2 = n2.getBoundingClientRect();
  return {
    xAxis: parseInt(Math.abs(rect1.left - rect2.left)),
    yAxis: parseInt(Math.abs(rect1.top - rect2.top)),
  };
};

export default getOffset;
