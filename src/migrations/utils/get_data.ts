export default async function getData(cursor: any) {
  const response = [];
  while (await cursor.hasNext()) {
    response.push(await cursor.next());
  }
  return response;
}
