const Footer = () => {
  return (
    <section className="flex w-full flex-wrap justify-center bg-black p-12 text-white">
      <div className="flex w-full flex-wrap justify-around gap-10">
        <div className="basis-3/10 p-4">
          <h1 className="mb-4 text-2xl font-bold">Help</h1>
          <ul className="ml-1 cursor-pointer">
            <li>Help Center</li>
            <li>Help Forum</li>
            <li>Video Tutorials</li>
          </ul>
        </div>
        <div className="basis-3/10 p-4">
          <h1 className="mb-4 text-2xl font-bold">Community</h1>
          <ul className="ml-1 cursor-pointer">
            <li>Blogger Buzz</li>
          </ul>
        </div>
        <div className="basis-3/10 p-4">
          <h1 className="mb-4 text-2xl font-bold">Developers</h1>
          <ul className="ml-1 cursor-pointer">
            <li>Blogger API</li>
            <li>Developer Forum</li>
          </ul>
        </div>
      </div>
      <div className="mr-20 ml-5 h-px w-full bg-gray-400"></div>
      <div className="w-full self-start p-5 whitespace-pre cursor-pointer font-semibold">
        Terms of Service    |    Privacy Content    |    Policy
      </div>
      <div className="w-full ml-5">
        <select className="border rounded-sm w-20 p-1">
            <option value="">English</option>
        </select>
      </div>
    </section>
  );
};

export default Footer;
