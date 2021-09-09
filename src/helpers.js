/**
 * follows a path on the given data to retrieve a value
 *
 * @example
 * var data = { foo : { bar : 'abc' } };
 * followPath(data, 'foo.bar'); // 'abc'
 * 
 * @param  {Object} data the object to get a value from
 * @param  {String} path a path to a value on the data object
 * @return the value of following the path on the data object
 */
export function followPath(data, path) {
  return path.split('.').reduce(function(prev, curr) {
    return prev && prev[curr];
  }, data);
}

/**
 * sets value of an element based on it's data-value attribute
 * 
 * @param  {Object}  data     the data source
 * @param  {Element} element  the element
 */
export function bindSingleElement(data, element) {
  var path = element.getAttribute('data-value');
  element.innerText = followPath(data, path);
}

/**
 * Binds data object to an element. Allows arbitrary nesting of fields
 *
 * @example
 * <div class='user'>
 *   <p data-value='name'></p>
 * </div>
 * 
 * var element = document.querySelector('.user');
 * bind({ name : 'Nick' }, element);
 * 
 * @param  {Object}  data     the data to bind to an element
 * @param  {Element} element  the element to bind data to
 */
export function bind(data, element) {
  var holders = element.querySelectorAll('[data-value]');
  [].forEach.call(holders, bindSingleElement.bind(null, data));
}
