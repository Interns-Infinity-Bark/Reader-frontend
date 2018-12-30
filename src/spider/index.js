import {stringify} from 'query-string';

/**
 * 获取所有分类
 */
export const getAllCategories = async () => {
    return (await fetch(`/api/cats/lv2/statistics`)).json();
};

/**
 * 获取排行榜类型
 */
export const getRankType = async () => {
    return (await fetch(`/api/ranking/gender`)).json();
};

/**
 * 获取排行榜
 * @param rankId(_id: 周榜ID, monthRank: 月榜ID, totalRank: 总榜ID)
 */
export const getRank = async (rankId) => {
    return (await fetch(`/api/ranking/${rankId}`)).json();
};

/**
 * 获取分类下小类别
 */
export const getCategoryDetail = async () => {
    return (await fetch(`/api/cats/lv2`)).json();
};

/**
 * 根据分类获取图书列表
 * @param params: {
 *     gender?(male: 男生, female: 女生, press: 出版, picture: 漫画),
 *     type?(hot: 热门, new: 新书, over: 完结),
 *     major,
 *     minor?,
 *     start?,
 *     limit?
 * }
 */
export const getBooksByCategory = async (params) => {
    return (await fetch(`/api/book/by-categories?${stringify(params)}`)).json();
};

/**
 * 获取图书信息
 * @param bookId
 */
export const getBook = async (bookId) => {
    return (await fetch(`/api/book/${bookId}`)).json();
};

/**
 *  获取图书正版源
 * @param bookId
 */
export const GetGenuineSource = async (bookId) => {
    const params = {};
    params.view = 'summary';
    params.book = bookId;
    return (await fetch(`/api/btoc?${stringify(params)}`)).json();
};

/**
 * 获取图书混合源
 * @param bookId
 */
export const getMixSource = async (bookId) => {
    const params = {};
    params.view = 'summary';
    params.book = bookId;
    return (await fetch(`/api/atoc?${stringify(params)}`)).json();
};

/**
 * 获取图书章节(根据图书ID)
 * @param bookId
 */
export const getChaptersByBookId = async (bookId) => {
    return (await fetch(`/api/mix-atoc/${bookId}?view=chapters`)).json();
};

/**
 * 获取图书章节(根据图书源ID)
 * @param sourceId
 */
export const getChaptersBySourceId = async (sourceId) => {
    return (await fetch(`/api/atoc/${sourceId}?view=chapters`)).json();
};

/**
 * 获取图书章节内容
 * @param link: 章节地址
 */
export const getChapter = async (link) => {
    return (await fetch(`/chapterup/chapter/${link}`)).json();
};

/**
 * 获取搜索热词
 */
export const getHotwords = async () => {
    return (await fetch(`/api/book/search-hotwords`)).json();
};

/**
 * 搜索自动补充
 * @param query
 */
export const autoCompleteQueries = async (query) => {
    return (await fetch(`/api/book/auto-complete?query=${query}`)).json();
};

/**
 * 模糊搜索
 * @param query
 */
export const fuzzySearch = async (query) => {
    return (await fetch(`/api/book/fuzzy-search?query=${query}`)).json();
};

/**
 * 获取图书最新章节
 * @param bookIds
 */
export const getLatestChapter = async (bookIds) => {
    const params = {};
    params.view = 'updated';
    params.id = bookIds.join(',');
    return (await fetch(`/api05iye5/book?${stringify(params)}`)).json();
};
