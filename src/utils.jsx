// Return the total number of checkboxes and the number of checked checkboxes inside a given text
export const findCheckboxes = text => {
  const checkboxes = text.match(/\[(\s|x)\]/g) || [];
  const checked = checkboxes.filter(checkbox => checkbox === "[x]").length;
  return { total: checkboxes.length, checked };
};

export const parser = linkStr => {
  return linkStr
    .split(",")
    .map(function(rel) {
      return rel.split(";").map(function(curr, idx) {
        if (idx === 0) return /&page=(\d+)/.exec(curr)[1];
        if (idx === 1) return /rel="(.+)"/.exec(curr)[1];
      });
    })
    .reduce(function(obj, curr, i) {
      obj[curr[1]] = curr[0];
      return obj;
    }, {});
};
