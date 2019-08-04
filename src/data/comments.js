
export default {
  desc: 'Список комментариев',
  data: addComents(15)
}


function addComents(count) {
  let data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      comment: `Текстовый комментарий номер ${i}`
    });
  }
  return data;
}