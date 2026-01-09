export interface CourseLink {
  title: string;
  url: string;
  type: 'free' | 'paid';
  platform: string;
}

// Comprehensive course mapping for 50+ popular skills
// Each skill has 2 free + 2 paid courses prioritized by quality
const courseDatabase: Record<string, { vi: CourseLink[]; en: CourseLink[] }> = {
  javascript: {
    vi: [
      { title: 'JavaScript từ A-Z cho người mới bắt đầu', url: 'https://www.youtube.com/watch?v=pxK3Z8xqDYw', type: 'free', platform: 'YouTube' },
      { title: 'JavaScript Tutorial for Beginners', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'free', platform: 'freeCodeCamp' },
      { title: 'The Complete JavaScript Course 2024', url: 'https://www.udemy.com/course/the-complete-javascript-course/', type: 'paid', platform: 'Udemy' },
      { title: 'JavaScript: Understanding the Weird Parts', url: 'https://www.udemy.com/course/understand-javascript/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'JavaScript Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', type: 'free', platform: 'YouTube' },
      { title: 'freeCodeCamp JavaScript Certification', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', type: 'free', platform: 'freeCodeCamp' },
      { title: 'The Complete JavaScript Course 2024', url: 'https://www.udemy.com/course/the-complete-javascript-course/', type: 'paid', platform: 'Udemy' },
      { title: 'JavaScript: The Advanced Concepts', url: 'https://www.udemy.com/course/advanced-javascript-concepts/', type: 'paid', platform: 'Udemy' },
    ],
  },
  react: {
    vi: [
      { title: 'ReactJS Cơ bản cho người mới', url: 'https://www.youtube.com/watch?v=x0fSBAgBrOQ', type: 'free', platform: 'YouTube' },
      { title: 'React Official Tutorial', url: 'https://react.dev/learn', type: 'free', platform: 'React.dev' },
      { title: 'React - The Complete Guide 2024', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', type: 'paid', platform: 'Udemy' },
      { title: 'Advanced React and Redux', url: 'https://www.udemy.com/course/react-redux-tutorial/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'React Course - Beginner Tutorial', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', type: 'free', platform: 'YouTube' },
      { title: 'React Official Documentation', url: 'https://react.dev/learn', type: 'free', platform: 'React.dev' },
      { title: 'React - The Complete Guide 2024', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', type: 'paid', platform: 'Udemy' },
      { title: 'Epic React by Kent C. Dodds', url: 'https://epicreact.dev/', type: 'paid', platform: 'EpicReact' },
    ],
  },
  python: {
    vi: [
      { title: 'Python cho người mới bắt đầu', url: 'https://www.youtube.com/watch?v=eWRfhZUzrAc', type: 'free', platform: 'YouTube' },
      { title: 'Python for Everybody', url: 'https://www.py4e.com/', type: 'free', platform: 'Py4e' },
      { title: 'Complete Python Bootcamp 2024', url: 'https://www.udemy.com/course/complete-python-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'Python for Data Science', url: 'https://www.coursera.org/specializations/python-data-science', type: 'paid', platform: 'Coursera' },
    ],
    en: [
      { title: 'Python for Beginners - Full Course', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', type: 'free', platform: 'YouTube' },
      { title: 'Python Certification', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', type: 'free', platform: 'freeCodeCamp' },
      { title: 'Complete Python Bootcamp 2024', url: 'https://www.udemy.com/course/complete-python-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'Python for Everybody Specialization', url: 'https://www.coursera.org/specializations/python', type: 'paid', platform: 'Coursera' },
    ],
  },
  java: {
    vi: [
      { title: 'Java cơ bản từ đầu', url: 'https://www.youtube.com/watch?v=FRhjaR6z69E', type: 'free', platform: 'YouTube' },
      { title: 'Java Programming Basics', url: 'https://java-programming.mooc.fi/', type: 'free', platform: 'MOOC.fi' },
      { title: 'Java Programming Masterclass', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', type: 'paid', platform: 'Udemy' },
      { title: 'Java In-Depth', url: 'https://www.udemy.com/course/java-in-depth-become-a-complete-java-engineer/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Java Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=eIrMbAQSU34', type: 'free', platform: 'YouTube' },
      { title: 'Java MOOC by University of Helsinki', url: 'https://java-programming.mooc.fi/', type: 'free', platform: 'MOOC.fi' },
      { title: 'Java Programming Masterclass', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', type: 'paid', platform: 'Udemy' },
      { title: 'Java Certification Path', url: 'https://www.pluralsight.com/paths/java', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  typescript: {
    vi: [
      { title: 'TypeScript cơ bản', url: 'https://www.youtube.com/watch?v=VGu1vDAWNTg', type: 'free', platform: 'YouTube' },
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'free', platform: 'TypeScript.org' },
      { title: 'Understanding TypeScript', url: 'https://www.udemy.com/course/understanding-typescript/', type: 'paid', platform: 'Udemy' },
      { title: 'TypeScript: The Complete Guide', url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'TypeScript Course for Beginners', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', type: 'free', platform: 'YouTube' },
      { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', type: 'free', platform: 'TypeScript.org' },
      { title: 'Understanding TypeScript 2024', url: 'https://www.udemy.com/course/understanding-typescript/', type: 'paid', platform: 'Udemy' },
      { title: 'TypeScript Fundamentals', url: 'https://frontendmasters.com/courses/typescript-v4/', type: 'paid', platform: 'Frontend Masters' },
    ],
  },
  'node.js': {
    vi: [
      { title: 'Node.js cơ bản', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', type: 'free', platform: 'YouTube' },
      { title: 'Node.js Tutorial', url: 'https://nodejs.dev/learn', type: 'free', platform: 'NodeJS.dev' },
      { title: 'Node.js - The Complete Guide', url: 'https://www.udemy.com/course/nodejs-the-complete-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'Node.js API Development', url: 'https://www.udemy.com/course/nodejs-api-masterclass/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Node.js Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', type: 'free', platform: 'YouTube' },
      { title: 'Node.js Official Guides', url: 'https://nodejs.org/en/docs/guides/', type: 'free', platform: 'NodeJS.org' },
      { title: 'Node.js - The Complete Guide', url: 'https://www.udemy.com/course/nodejs-the-complete-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'Node.js Application Development', url: 'https://www.pluralsight.com/paths/node-js', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  sql: {
    vi: [
      { title: 'SQL cho người mới bắt đầu', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', type: 'free', platform: 'YouTube' },
      { title: 'SQL Tutorial - W3Schools', url: 'https://www.w3schools.com/sql/', type: 'free', platform: 'W3Schools' },
      { title: 'The Complete SQL Bootcamp', url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'SQL for Data Analysis', url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198', type: 'paid', platform: 'Udacity' },
    ],
    en: [
      { title: 'SQL Tutorial - Full Course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', type: 'free', platform: 'YouTube' },
      { title: 'SQL Tutorial by W3Schools', url: 'https://www.w3schools.com/sql/', type: 'free', platform: 'W3Schools' },
      { title: 'The Complete SQL Bootcamp 2024', url: 'https://www.udemy.com/course/the-complete-sql-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'SQL and Database Design', url: 'https://www.coursera.org/specializations/learn-sql-basics-data-science', type: 'paid', platform: 'Coursera' },
    ],
  },
  git: {
    vi: [
      { title: 'Git và GitHub cơ bản', url: 'https://www.youtube.com/watch?v=1JuYQgpbrW0', type: 'free', platform: 'YouTube' },
      { title: 'Git Tutorial - Atlassian', url: 'https://www.atlassian.com/git/tutorials', type: 'free', platform: 'Atlassian' },
      { title: 'Git Complete Guide', url: 'https://www.udemy.com/course/git-complete/', type: 'paid', platform: 'Udemy' },
      { title: 'Git & GitHub Masterclass', url: 'https://www.udemy.com/course/git-and-github-bootcamp/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Git and GitHub for Beginners', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', type: 'free', platform: 'YouTube' },
      { title: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/', type: 'free', platform: 'GitHub' },
      { title: 'Git Complete: The Guide', url: 'https://www.udemy.com/course/git-complete/', type: 'paid', platform: 'Udemy' },
      { title: 'Git In-Depth', url: 'https://frontendmasters.com/courses/git-in-depth/', type: 'paid', platform: 'Frontend Masters' },
    ],
  },
  docker: {
    vi: [
      { title: 'Docker cho người mới bắt đầu', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'free', platform: 'YouTube' },
      { title: 'Docker Official Tutorial', url: 'https://docs.docker.com/get-started/', type: 'free', platform: 'Docker.com' },
      { title: 'Docker Mastery', url: 'https://www.udemy.com/course/docker-mastery/', type: 'paid', platform: 'Udemy' },
      { title: 'Docker and Kubernetes Complete', url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Docker Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'free', platform: 'YouTube' },
      { title: 'Docker Getting Started', url: 'https://docs.docker.com/get-started/', type: 'free', platform: 'Docker.com' },
      { title: 'Docker Mastery: Complete Toolset', url: 'https://www.udemy.com/course/docker-mastery/', type: 'paid', platform: 'Udemy' },
      { title: 'Docker Deep Dive', url: 'https://www.pluralsight.com/courses/docker-deep-dive-update', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  kubernetes: {
    vi: [
      { title: 'Kubernetes cơ bản', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', type: 'free', platform: 'YouTube' },
      { title: 'Kubernetes Tutorial', url: 'https://kubernetes.io/docs/tutorials/', type: 'free', platform: 'Kubernetes.io' },
      { title: 'Kubernetes for Developers', url: 'https://www.udemy.com/course/kubernetes-for-developers/', type: 'paid', platform: 'Udemy' },
      { title: 'Kubernetes Mastery', url: 'https://www.udemy.com/course/kubernetesmastery/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Kubernetes Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', type: 'free', platform: 'YouTube' },
      { title: 'Kubernetes Official Tutorials', url: 'https://kubernetes.io/docs/tutorials/', type: 'free', platform: 'Kubernetes.io' },
      { title: 'Kubernetes for Developers', url: 'https://www.udemy.com/course/kubernetes-for-developers/', type: 'paid', platform: 'Udemy' },
      { title: 'Kubernetes Certified Developer', url: 'https://www.pluralsight.com/paths/certified-kubernetes-application-developer-ckad', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  aws: {
    vi: [
      { title: 'AWS cơ bản cho người mới', url: 'https://www.youtube.com/watch?v=ulprqHHWlng', type: 'free', platform: 'YouTube' },
      { title: 'AWS Free Tier Tutorial', url: 'https://aws.amazon.com/getting-started/', type: 'free', platform: 'AWS' },
      { title: 'AWS Certified Solutions Architect', url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', type: 'paid', platform: 'Udemy' },
      { title: 'Ultimate AWS Certified Developer', url: 'https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'AWS Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=ulprqHHWlng', type: 'free', platform: 'YouTube' },
      { title: 'AWS Getting Started', url: 'https://aws.amazon.com/getting-started/', type: 'free', platform: 'AWS' },
      { title: 'AWS Certified Solutions Architect', url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', type: 'paid', platform: 'Udemy' },
      { title: 'AWS Cloud Practitioner Essentials', url: 'https://www.coursera.org/learn/aws-cloud-practitioner-essentials', type: 'paid', platform: 'Coursera' },
    ],
  },
  // Continue with more skills...
  angular: {
    vi: [
      { title: 'Angular cơ bản', url: 'https://www.youtube.com/watch?v=3dHNOWTI7H8', type: 'free', platform: 'YouTube' },
      { title: 'Angular Official Tutorial', url: 'https://angular.io/tutorial', type: 'free', platform: 'Angular.io' },
      { title: 'Angular - The Complete Guide', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', type: 'paid', platform: 'Udemy' },
      { title: 'Angular Fundamentals', url: 'https://www.pluralsight.com/courses/angular-fundamentals', type: 'paid', platform: 'Pluralsight' },
    ],
    en: [
      { title: 'Angular Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=3dHNOWTI7H8', type: 'free', platform: 'YouTube' },
      { title: 'Angular Getting Started', url: 'https://angular.io/tutorial', type: 'free', platform: 'Angular.io' },
      { title: 'Angular - The Complete Guide 2024', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', type: 'paid', platform: 'Udemy' },
      { title: 'Angular Fundamentals', url: 'https://www.pluralsight.com/courses/angular-fundamentals', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  'vue.js': {
    vi: [
      { title: 'Vue.js cơ bản', url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', type: 'free', platform: 'YouTube' },
      { title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', type: 'free', platform: 'Vue.js.org' },
      { title: 'Vue - The Complete Guide', url: 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'Vue.js 3 Masterclass', url: 'https://www.udemy.com/course/vuejs-3-the-composition-api/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Vue.js Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c', type: 'free', platform: 'YouTube' },
      { title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', type: 'free', platform: 'Vue.js.org' },
      { title: 'Vue - The Complete Guide 2024', url: 'https://www.udemy.com/course/vuejs-2-the-complete-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'Vue.js 3 Fundamentals', url: 'https://frontendmasters.com/courses/vue-3/', type: 'paid', platform: 'Frontend Masters' },
    ],
  },
  mongodb: {
    vi: [
      { title: 'MongoDB cơ bản', url: 'https://www.youtube.com/watch?v=-56x56UppqQ', type: 'free', platform: 'YouTube' },
      { title: 'MongoDB University', url: 'https://university.mongodb.com/', type: 'free', platform: 'MongoDB' },
      { title: 'MongoDB - The Complete Guide', url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'MongoDB for Node.js Developers', url: 'https://www.udemy.com/course/mongodb-nodejs/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'MongoDB Crash Course', url: 'https://www.youtube.com/watch?v=-56x56UppqQ', type: 'free', platform: 'YouTube' },
      { title: 'MongoDB University Free Courses', url: 'https://university.mongodb.com/', type: 'free', platform: 'MongoDB' },
      { title: 'MongoDB - The Complete Guide 2024', url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'MongoDB for Developers', url: 'https://www.coursera.org/learn/introduction-mongodb', type: 'paid', platform: 'Coursera' },
    ],
  },
  postgresql: {
    vi: [
      { title: 'PostgreSQL cho người mới', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', type: 'free', platform: 'YouTube' },
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'free', platform: 'PostgreSQLTutorial' },
      { title: 'PostgreSQL Bootcamp', url: 'https://www.udemy.com/course/postgresql-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'SQL and PostgreSQL for Beginners', url: 'https://www.udemy.com/course/sql-and-postgresql/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'PostgreSQL Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', type: 'free', platform: 'YouTube' },
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com/', type: 'free', platform: 'PostgreSQLTutorial' },
      { title: 'PostgreSQL Bootcamp 2024', url: 'https://www.udemy.com/course/postgresql-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'PostgreSQL: Advanced Queries', url: 'https://www.pluralsight.com/courses/postgresql-advanced-server-programming', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  redis: {
    vi: [
      { title: 'Redis cơ bản', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ', type: 'free', platform: 'YouTube' },
      { title: 'Redis Official Tutorial', url: 'https://redis.io/docs/manual/', type: 'free', platform: 'Redis.io' },
      { title: 'Redis: The Complete Guide', url: 'https://www.udemy.com/course/redis-the-complete-developers-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'Redis for Developers', url: 'https://university.redis.com/', type: 'paid', platform: 'Redis University' },
    ],
    en: [
      { title: 'Redis Crash Course', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ', type: 'free', platform: 'YouTube' },
      { title: 'Redis Documentation', url: 'https://redis.io/docs/', type: 'free', platform: 'Redis.io' },
      { title: 'Redis: The Complete Guide', url: 'https://www.udemy.com/course/redis-the-complete-developers-guide/', type: 'paid', platform: 'Udemy' },
      { title: 'Redis University Courses', url: 'https://university.redis.com/', type: 'paid', platform: 'Redis University' },
    ],
  },
  graphql: {
    vi: [
      { title: 'GraphQL cơ bản', url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q', type: 'free', platform: 'YouTube' },
      { title: 'GraphQL Official Tutorial', url: 'https://graphql.org/learn/', type: 'free', platform: 'GraphQL.org' },
      { title: 'GraphQL with React Complete', url: 'https://www.udemy.com/course/graphql-with-react-course/', type: 'paid', platform: 'Udemy' },
      { title: 'Advanced GraphQL', url: 'https://www.udemy.com/course/graphql-by-example/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'GraphQL Full Course', url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q', type: 'free', platform: 'YouTube' },
      { title: 'GraphQL Learning Path', url: 'https://graphql.org/learn/', type: 'free', platform: 'GraphQL.org' },
      { title: 'GraphQL with React: Complete Guide', url: 'https://www.udemy.com/course/graphql-with-react-course/', type: 'paid', platform: 'Udemy' },
      { title: 'Advanced GraphQL v2', url: 'https://frontendmasters.com/courses/advanced-graphql-v2/', type: 'paid', platform: 'Frontend Masters' },
    ],
  },
  'rest api': {
    vi: [
      { title: 'REST API cơ bản', url: 'https://www.youtube.com/watch?v=SLwpqD8n3d0', type: 'free', platform: 'YouTube' },
      { title: 'REST API Tutorial', url: 'https://restfulapi.net/', type: 'free', platform: 'RESTfulAPI.net' },
      { title: 'REST APIs with Node.js', url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'API Development Masterclass', url: 'https://www.udemy.com/course/api-and-web-service-introduction/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'REST API Crash Course', url: 'https://www.youtube.com/watch?v=SLwpqD8n3d0', type: 'free', platform: 'YouTube' },
      { title: 'REST API Tutorial', url: 'https://restfulapi.net/', type: 'free', platform: 'RESTfulAPI.net' },
      { title: 'REST APIs with Node.js and Express', url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'RESTful Web Services with Node.js', url: 'https://www.pluralsight.com/courses/node-js-express-rest-web-services', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  html: {
    vi: [
      { title: 'HTML cơ bản', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', type: 'free', platform: 'YouTube' },
      { title: 'HTML Tutorial - W3Schools', url: 'https://www.w3schools.com/html/', type: 'free', platform: 'W3Schools' },
      { title: 'HTML and CSS Complete Course', url: 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', type: 'paid', platform: 'Udemy' },
      { title: 'Modern HTML & CSS', url: 'https://www.udemy.com/course/modern-html-css-from-the-beginning/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'HTML Full Course - Build a Website', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', type: 'free', platform: 'YouTube' },
      { title: 'HTML Tutorial by W3Schools', url: 'https://www.w3schools.com/html/', type: 'free', platform: 'W3Schools' },
      { title: 'HTML and CSS for Beginners', url: 'https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/', type: 'paid', platform: 'Udemy' },
      { title: 'HTML & CSS Certification', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', type: 'paid', platform: 'freeCodeCamp' },
    ],
  },
  css: {
    vi: [
      { title: 'CSS cơ bản', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', type: 'free', platform: 'YouTube' },
      { title: 'CSS Tutorial - W3Schools', url: 'https://www.w3schools.com/css/', type: 'free', platform: 'W3Schools' },
      { title: 'Advanced CSS and Sass', url: 'https://www.udemy.com/course/advanced-css-and-sass/', type: 'paid', platform: 'Udemy' },
      { title: 'CSS - The Complete Guide', url: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'CSS Tutorial - Full Course', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', type: 'free', platform: 'YouTube' },
      { title: 'CSS Tutorial by W3Schools', url: 'https://www.w3schools.com/css/', type: 'free', platform: 'W3Schools' },
      { title: 'Advanced CSS and Sass', url: 'https://www.udemy.com/course/advanced-css-and-sass/', type: 'paid', platform: 'Udemy' },
      { title: 'CSS Grid & Flexbox Masterclass', url: 'https://frontendmasters.com/courses/css-grid-flexbox-v2/', type: 'paid', platform: 'Frontend Masters' },
    ],
  },
  tailwind: {
    vi: [
      { title: 'Tailwind CSS cơ bản', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ', type: 'free', platform: 'YouTube' },
      { title: 'Tailwind Official Docs', url: 'https://tailwindcss.com/docs', type: 'free', platform: 'TailwindCSS.com' },
      { title: 'Tailwind CSS From Scratch', url: 'https://www.udemy.com/course/tailwind-from-scratch/', type: 'paid', platform: 'Udemy' },
      { title: 'Tailwind CSS Complete Guide', url: 'https://www.udemy.com/course/tailwind-css-zero-to-hero/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Tailwind CSS Tutorial', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ', type: 'free', platform: 'YouTube' },
      { title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs', type: 'free', platform: 'TailwindCSS.com' },
      { title: 'Tailwind CSS From Scratch', url: 'https://www.udemy.com/course/tailwind-from-scratch/', type: 'paid', platform: 'Udemy' },
      { title: 'Tailwind CSS Complete Course', url: 'https://frontendmasters.com/courses/tailwind-css/', type: 'paid', platform: 'Frontend Masters' },
    ],
  },
  'c++': {
    vi: [
      { title: 'C++ cơ bản', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', type: 'free', platform: 'YouTube' },
      { title: 'Learn C++ - Free Course', url: 'https://www.learncpp.com/', type: 'free', platform: 'LearnCPP.com' },
      { title: 'Beginning C++ Programming', url: 'https://www.udemy.com/course/beginning-c-plus-plus-programming/', type: 'paid', platform: 'Udemy' },
      { title: 'Advanced C++ Programming', url: 'https://www.udemy.com/course/cpp-deep-dive/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'C++ Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', type: 'free', platform: 'YouTube' },
      { title: 'Learn C++ - Complete Guide', url: 'https://www.learncpp.com/', type: 'free', platform: 'LearnCPP.com' },
      { title: 'Beginning C++ Programming Course', url: 'https://www.udemy.com/course/beginning-c-plus-plus-programming/', type: 'paid', platform: 'Udemy' },
      { title: 'C++ Fundamentals', url: 'https://www.pluralsight.com/paths/c-plus-plus', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  'c#': {
    vi: [
      { title: 'C# cơ bản', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', type: 'free', platform: 'YouTube' },
      { title: 'C# Documentation - Microsoft', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', type: 'free', platform: 'Microsoft Learn' },
      { title: 'C# Masterclass', url: 'https://www.udemy.com/course/complete-csharp-masterclass/', type: 'paid', platform: 'Udemy' },
      { title: 'C# Advanced Topics', url: 'https://www.udemy.com/course/csharp-advanced/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'C# Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', type: 'free', platform: 'YouTube' },
      { title: 'C# Documentation', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', type: 'free', platform: 'Microsoft Learn' },
      { title: 'Complete C# Masterclass', url: 'https://www.udemy.com/course/complete-csharp-masterclass/', type: 'paid', platform: 'Udemy' },
      { title: 'C# Path', url: 'https://www.pluralsight.com/paths/c-sharp', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  '.net': {
    vi: [
      { title: '.NET cơ bản', url: 'https://www.youtube.com/watch?v=hZ1DASYd9rk', type: 'free', platform: 'YouTube' },
      { title: '.NET Documentation', url: 'https://learn.microsoft.com/en-us/dotnet/', type: 'free', platform: 'Microsoft Learn' },
      { title: '.NET Core Complete Guide', url: 'https://www.udemy.com/course/complete-aspnet-core-21-course/', type: 'paid', platform: 'Udemy' },
      { title: 'ASP.NET Core Bootcamp', url: 'https://www.udemy.com/course/aspnet-core-api/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: '.NET Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=hZ1DASYd9rk', type: 'free', platform: 'YouTube' },
      { title: '.NET Learning Path', url: 'https://learn.microsoft.com/en-us/dotnet/', type: 'free', platform: 'Microsoft Learn' },
      { title: 'Complete ASP.NET Core Guide', url: 'https://www.udemy.com/course/complete-aspnet-core-21-course/', type: 'paid', platform: 'Udemy' },
      { title: '.NET Core Path', url: 'https://www.pluralsight.com/paths/net-core', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  ruby: {
    vi: [
      { title: 'Ruby cơ bản', url: 'https://www.youtube.com/watch?v=t_ispmWmdjY', type: 'free', platform: 'YouTube' },
      { title: 'Ruby Tutorial', url: 'https://www.ruby-lang.org/en/documentation/quickstart/', type: 'free', platform: 'Ruby-lang.org' },
      { title: 'Complete Ruby Programming', url: 'https://www.udemy.com/course/learn-to-code-with-ruby-lang/', type: 'paid', platform: 'Udemy' },
      { title: 'Ruby on Rails Complete', url: 'https://www.udemy.com/course/the-complete-ruby-on-rails-developer-course/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Ruby Programming Tutorial', url: 'https://www.youtube.com/watch?v=t_ispmWmdjY', type: 'free', platform: 'YouTube' },
      { title: 'Ruby in 20 Minutes', url: 'https://www.ruby-lang.org/en/documentation/quickstart/', type: 'free', platform: 'Ruby-lang.org' },
      { title: 'Complete Ruby Programming', url: 'https://www.udemy.com/course/learn-to-code-with-ruby-lang/', type: 'paid', platform: 'Udemy' },
      { title: 'Ruby Fundamentals', url: 'https://www.pluralsight.com/courses/ruby-fundamentals', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  php: {
    vi: [
      { title: 'PHP cơ bản', url: 'https://www.youtube.com/watch?v=OK_JCtrrv-c', type: 'free', platform: 'YouTube' },
      { title: 'PHP Tutorial - W3Schools', url: 'https://www.w3schools.com/php/', type: 'free', platform: 'W3Schools' },
      { title: 'PHP for Beginners', url: 'https://www.udemy.com/course/php-for-complete-beginners-includes-msql-object-oriented/', type: 'paid', platform: 'Udemy' },
      { title: 'PHP OOP Complete Guide', url: 'https://www.udemy.com/course/object-oriented-php-mysql/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'PHP Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=OK_JCtrrv-c', type: 'free', platform: 'YouTube' },
      { title: 'PHP Tutorial by W3Schools', url: 'https://www.w3schools.com/php/', type: 'free', platform: 'W3Schools' },
      { title: 'PHP for Beginners - Complete Course', url: 'https://www.udemy.com/course/php-for-complete-beginners-includes-msql-object-oriented/', type: 'paid', platform: 'Udemy' },
      { title: 'PHP Development Path', url: 'https://www.pluralsight.com/paths/php', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  laravel: {
    vi: [
      { title: 'Laravel cơ bản', url: 'https://www.youtube.com/watch?v=ImtZ5yENzgE', type: 'free', platform: 'YouTube' },
      { title: 'Laravel Official Documentation', url: 'https://laravel.com/docs', type: 'free', platform: 'Laravel.com' },
      { title: 'Laravel - The Complete Guide', url: 'https://www.udemy.com/course/laravel-for-beginners/', type: 'paid', platform: 'Udemy' },
      { title: 'Laravel Advanced', url: 'https://www.udemy.com/course/laravel-api-development/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Laravel Crash Course', url: 'https://www.youtube.com/watch?v=ImtZ5yENzgE', type: 'free', platform: 'YouTube' },
      { title: 'Laravel Documentation', url: 'https://laravel.com/docs', type: 'free', platform: 'Laravel.com' },
      { title: 'Laravel - Complete Beginner to Advanced', url: 'https://www.udemy.com/course/laravel-for-beginners/', type: 'paid', platform: 'Udemy' },
      { title: 'Laravel Path to Mastery', url: 'https://laracasts.com/', type: 'paid', platform: 'Laracasts' },
    ],
  },
  django: {
    vi: [
      { title: 'Django cơ bản', url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4', type: 'free', platform: 'YouTube' },
      { title: 'Django Official Tutorial', url: 'https://docs.djangoproject.com/en/stable/intro/tutorial01/', type: 'free', platform: 'DjangoProject.com' },
      { title: 'Python Django Complete Course', url: 'https://www.udemy.com/course/python-and-django-full-stack-web-developer-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'Django for APIs', url: 'https://www.udemy.com/course/django-rest-framework/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Django Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4', type: 'free', platform: 'YouTube' },
      { title: 'Django Official Tutorial', url: 'https://docs.djangoproject.com/en/stable/intro/tutorial01/', type: 'free', platform: 'DjangoProject.com' },
      { title: 'Python Django Web Development', url: 'https://www.udemy.com/course/python-and-django-full-stack-web-developer-bootcamp/', type: 'paid', platform: 'Udemy' },
      { title: 'Django for Everybody', url: 'https://www.coursera.org/specializations/django', type: 'paid', platform: 'Coursera' },
    ],
  },
  flask: {
    vi: [
      { title: 'Flask cơ bản', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', type: 'free', platform: 'YouTube' },
      { title: 'Flask Official Tutorial', url: 'https://flask.palletsprojects.com/en/stable/tutorial/', type: 'free', platform: 'Flask.dev' },
      { title: 'Flask Complete Course', url: 'https://www.udemy.com/course/rest-api-flask-and-python/', type: 'paid', platform: 'Udemy' },
      { title: 'Flask Web Development', url: 'https://www.udemy.com/course/python-flask-beginners/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Flask Tutorial', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', type: 'free', platform: 'YouTube' },
      { title: 'Flask Quickstart', url: 'https://flask.palletsprojects.com/en/stable/quickstart/', type: 'free', platform: 'Flask.dev' },
      { title: 'REST APIs with Flask', url: 'https://www.udemy.com/course/rest-api-flask-and-python/', type: 'paid', platform: 'Udemy' },
      { title: 'Flask for Web Development', url: 'https://www.pluralsight.com/courses/flask-getting-started', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  'spring boot': {
    vi: [
      { title: 'Spring Boot cơ bản', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U', type: 'free', platform: 'YouTube' },
      { title: 'Spring Boot Guides', url: 'https://spring.io/guides', type: 'free', platform: 'Spring.io' },
      { title: 'Spring Boot Complete Guide', url: 'https://www.udemy.com/course/spring-boot-tutorial-for-beginners/', type: 'paid', platform: 'Udemy' },
      { title: 'Spring Framework Master Class', url: 'https://www.udemy.com/course/spring-tutorial-for-beginners/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Spring Boot Tutorial', url: 'https://www.youtube.com/watch?v=9SGDpanrc8U', type: 'free', platform: 'YouTube' },
      { title: 'Spring Boot Getting Started', url: 'https://spring.io/quickstart', type: 'free', platform: 'Spring.io' },
      { title: 'Spring Boot Complete Guide 2024', url: 'https://www.udemy.com/course/spring-boot-tutorial-for-beginners/', type: 'paid', platform: 'Udemy' },
      { title: 'Spring Framework Certification', url: 'https://www.pluralsight.com/paths/spring-framework', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  jenkins: {
    vi: [
      { title: 'Jenkins cơ bản', url: 'https://www.youtube.com/watch?v=FX322RVNGj4', type: 'free', platform: 'YouTube' },
      { title: 'Jenkins Documentation', url: 'https://www.jenkins.io/doc/tutorials/', type: 'free', platform: 'Jenkins.io' },
      { title: 'Jenkins Complete Guide', url: 'https://www.udemy.com/course/jenkins-from-zero-to-hero/', type: 'paid', platform: 'Udemy' },
      { title: 'DevOps with Jenkins', url: 'https://www.udemy.com/course/jenkins-course-devops-cicd-complete-reference/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Jenkins Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=FX322RVNGj4', type: 'free', platform: 'YouTube' },
      { title: 'Jenkins User Documentation', url: 'https://www.jenkins.io/doc/', type: 'free', platform: 'Jenkins.io' },
      { title: 'Jenkins From Zero To Hero', url: 'https://www.udemy.com/course/jenkins-from-zero-to-hero/', type: 'paid', platform: 'Udemy' },
      { title: 'Continuous Integration with Jenkins', url: 'https://www.pluralsight.com/courses/jenkins-getting-started', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  terraform: {
    vi: [
      { title: 'Terraform cơ bản', url: 'https://www.youtube.com/watch?v=l5k1ai_GBDE', type: 'free', platform: 'YouTube' },
      { title: 'Terraform Tutorials', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'free', platform: 'HashiCorp' },
      { title: 'Terraform Complete Guide', url: 'https://www.udemy.com/course/terraform-beginner-to-advanced/', type: 'paid', platform: 'Udemy' },
      { title: 'Terraform on AWS', url: 'https://www.udemy.com/course/terraform-on-aws-with-sre-iac-devops-real-world-demos/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Terraform Course - Automate Infrastructure', url: 'https://www.youtube.com/watch?v=l5k1ai_GBDE', type: 'free', platform: 'YouTube' },
      { title: 'HashiCorp Learn Terraform', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'free', platform: 'HashiCorp' },
      { title: 'Terraform Beginner to Advanced', url: 'https://www.udemy.com/course/terraform-beginner-to-advanced/', type: 'paid', platform: 'Udemy' },
      { title: 'Deep Dive - Terraform', url: 'https://www.pluralsight.com/courses/terraform-deep-dive', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  ansible: {
    vi: [
      { title: 'Ansible cơ bản', url: 'https://www.youtube.com/watch?v=3RiVKs8GHYQ', type: 'free', platform: 'YouTube' },
      { title: 'Ansible Documentation', url: 'https://docs.ansible.com/ansible/latest/getting_started/', type: 'free', platform: 'Ansible.com' },
      { title: 'Ansible for DevOps', url: 'https://www.udemy.com/course/learn-ansible/', type: 'paid', platform: 'Udemy' },
      { title: 'Mastering Ansible', url: 'https://www.udemy.com/course/mastering-ansible/', type: 'paid', platform: 'Udemy' },
    ],
    en: [
      { title: 'Ansible Full Course', url: 'https://www.youtube.com/watch?v=3RiVKs8GHYQ', type: 'free', platform: 'YouTube' },
      { title: 'Ansible Getting Started', url: 'https://docs.ansible.com/ansible/latest/getting_started/', type: 'free', platform: 'Ansible.com' },
      { title: 'Ansible for the Absolute Beginner', url: 'https://www.udemy.com/course/learn-ansible/', type: 'paid', platform: 'Udemy' },
      { title: 'Ansible Fundamentals', url: 'https://www.pluralsight.com/courses/ansible-fundamentals', type: 'paid', platform: 'Pluralsight' },
    ],
  },
  // Add more skills as needed...
  'machine learning': {
    vi: [
      { title: 'Machine Learning cơ bản', url: 'https://www.youtube.com/watch?v=gmvvaobm7eQ', type: 'free', platform: 'YouTube' },
      { title: 'ML Course by Google', url: 'https://developers.google.com/machine-learning/crash-course', type: 'free', platform: 'Google' },
      { title: 'Machine Learning A-Z', url: 'https://www.udemy.com/course/machinelearning/', type: 'paid', platform: 'Udemy' },
      { title: 'ML Specialization - Stanford', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'paid', platform: 'Coursera' },
    ],
    en: [
      { title: 'Machine Learning Tutorial', url: 'https://www.youtube.com/watch?v=gmvvaobm7eQ', type: 'free', platform: 'YouTube' },
      { title: 'ML Crash Course by Google', url: 'https://developers.google.com/machine-learning/crash-course', type: 'free', platform: 'Google' },
      { title: 'Machine Learning A-Z™', url: 'https://www.udemy.com/course/machinelearning/', type: 'paid', platform: 'Udemy' },
      { title: 'Machine Learning by Andrew Ng', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'paid', platform: 'Coursera' },
    ],
  },
};

// Normalize skill names for matching
function normalizeSkillName(skill: string): string {
  return skill.toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\./g, '');
}

/**
 * Get course recommendations for a specific skill
 * @param skillName - The skill to find courses for
 * @returns Array of courses (2 free + 2 paid), or Google search fallback
 */
export function getCourseLinks(
  skillName: string
): CourseLink[] {
  const normalized = normalizeSkillName(skillName);
  
  // Direct match
  if (courseDatabase[normalized]) {
    return courseDatabase[normalized]['en'];
  }
  
  // Try to find partial matches
  const partialMatch = Object.keys(courseDatabase).find(key => 
    normalized.includes(key) || key.includes(normalized)
  );
  
  if (partialMatch) {
    return courseDatabase[partialMatch]['en'];
  }
  
  // No courses found - fallback to Google search
  const searchQuery = encodeURIComponent(`${skillName} course tutorial`);
  return [
    {
      title: `Search "${skillName}" courses on Google`,
      url: `https://www.google.com/search?q=${searchQuery}`,
      type: 'free',
      platform: 'Google Search'
    }
  ];
}

/**
 * Get all available skills in the database
 */
export function getAvailableSkills(): string[] {
  return Object.keys(courseDatabase);
}

/**
 * Check if courses are available for a skill
 */
export function hasCoursesForSkill(skillName: string): boolean {
  const normalized = normalizeSkillName(skillName);
  return courseDatabase[normalized] !== undefined;
}
