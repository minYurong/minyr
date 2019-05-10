import Courses from './components/courses/courses.js';


const App = document.getElementById('app');
App.innerHTML = new Courses().tpl;