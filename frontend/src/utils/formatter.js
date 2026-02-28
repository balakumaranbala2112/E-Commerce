export const calculateDiscount = (selling, mrp) => {
  return Math.ceil(((mrp - selling) / mrp) * 100);
};

export const formatDate = (ipDate) => {
  const date = new Date(ipDate);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
