type MainContentProps = {
  children: React.ReactNode;
};

function MainContent({ children }: MainContentProps) {
  return (
    <div>
      <p>MainContent</p>
      {children}
    </div>
  );
}

export default MainContent;
