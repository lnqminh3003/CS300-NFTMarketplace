const log = (tit: string, ...msgs: any[]) => {
  console.log(`[seazle] ${tit}:`, ...msgs);
};

export default log;
