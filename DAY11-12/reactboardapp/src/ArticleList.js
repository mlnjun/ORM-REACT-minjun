import React from 'react';

import ArticleItem from './ArticleItem';

const ArticleList = ({articles, handleSelect}) => {
  return (
    <div>
      <ArticleItem articles={articles} handleSelect={handleSelect}></ArticleItem>
    </div>
  );
};

export default ArticleList;