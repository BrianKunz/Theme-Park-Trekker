interface User {
  username: string;
  email: string;
  password: string;
  admin: boolean;
}

interface Post {
  username: string;
  title: string;
  image: string;
  description: string;
  time: Date;
  comments: Array;
}

interface Comment {
  username: string;
  time: Date;
  body: string;
}

interface Trip {
  username: string;
  date: Date;
  start_date: Date;
  end_date: Date;
  flight: string;
}
