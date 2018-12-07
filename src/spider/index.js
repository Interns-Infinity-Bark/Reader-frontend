export const getAllCategories = async () => {
    return (await fetch(`/api/cats/lv2/statistics`)).json();
};
