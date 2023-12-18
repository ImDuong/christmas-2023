export function navigate(uri) {
  if (uri.length == 0) {
    return;
  }
  window.location.href = uri;
}
