const apiRequest = async (
  url: string = "",
  optionsObj: any = null,
  errMsg: any = null
) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err: any) {
    errMsg = err?.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
