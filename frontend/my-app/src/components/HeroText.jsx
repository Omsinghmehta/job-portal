import Typewriter from 'typewriter-effect';

export default function HeroText() {
  return (
    <div className="text-3xl font-bold text-center mt-10">
      <Typewriter
        options={{
          strings: ['Welcome to JobPortal!', 'Find Your Dream Job!', 'Start Hiring Now!'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
        }}
      />
    </div>
  );
}
