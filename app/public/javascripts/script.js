$(() => {
  // 新規登録ボタン押下処理
  $("#add-button").click((e) => {
    window.location.href = "/users/add";
  });
  // 修正ボタン押下
  $("[data-select-button-id]").click((e) => {
    const selectedId = e.currentTarget.dataset.selectButtonId;
    window.location.href = `/users/edit?id=${selectedId}`;
  });
});
