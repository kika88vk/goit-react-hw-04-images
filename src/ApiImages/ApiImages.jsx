export async function apiImages(tags, page) {
  const apiKey = '37262675-c60479e6538b2ce74a07e98ab';
  const res = await fetch(
    `https://pixabay.com/api/?q=${tags}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(new Error(`Don't found ${tags} pictures`));
}
