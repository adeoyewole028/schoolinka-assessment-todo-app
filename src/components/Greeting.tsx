const currentTime = new Date().getHours();

let greeting = "";

if (currentTime < 12) {
  greeting = "Good morning";
} else if (currentTime < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

export const Greet = () => {
  return <h1 className="text-3xl font-semibold">{greeting}!</h1>;
};
