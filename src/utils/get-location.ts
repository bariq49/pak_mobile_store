
const  getLocation = (url: string) => {
  // Extract coordinates from the URL
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/
  const match = url.match(regex)
  
  if (match && match[1] && match[2]) {
    const lat = match[1]
    const lng = match[2]
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM03CsDA3JzA2LjQiTiAxNDTCsDQ4JzQ5LjYiRQ!5e0!3m2!1sen!2sus!4v1619705401382!5m2!1sen!2sus`
  }
  
  // Fallback to a default embed URL
  return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d144.8137714!3d-37.7456374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM03CsDA3JzA2LjQiTiAxNDTCsDQ4JzQ5LjYiRQ!5e0!3m2!1sen!2sus!4v1619705401382!5m2!1sen!2sus"
}
export default getLocation;