const URL = import.meta.env.VITE_SERVER_URL;

if (!URL) throw Error('You must write server url');

const join = (...urls: string[]) => urls.reduce((prev, curr) => prev.replace(/\/$/, '') + '/' + curr.replace(/^\//, ''))

const endpoint = (str: TemplateStringsArray, ...variables: string[]) => {
  const original = str.reduce((prev, curr, index) => prev + variables[index - 1] + curr);

  return join(URL, original);
};

const Endpoints = {
  NOTICE_LIST: endpoint`/notice`,
  NOTICE: (id: string) => endpoint`/notice/${id}`,
  LETTER: endpoint`user`,
  REVIEW_LIST: endpoint`/review`,
  REVIEW: (id: string) => endpoint`/review/${id}`,
  MAIN: endpoint`/`,
  USER_CHECK: endpoint`/user/check`,
};

export default Endpoints;
