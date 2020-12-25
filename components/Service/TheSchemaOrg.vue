<template>

  <div itemscope itemtype="https://schema.org/Article">
      <link itemprop="mainEntityOfPage" href="https://example.ru/" />
      <link itemprop="image" href="image">
      <meta itemprop="headline name" content="Название Статьи">
      <meta itemprop="description"
            content="Обязательное краткое описание статьи для Яндекса длиной от 50 до 150 символов.">
      <meta itemprop="author" content="автор статьи">
      <meta itemprop="datePublished" datetime="2010-07-03" content="2010-07-03">
      <meta itemprop="dateModified" datetime="2018-09-15" content="2018-09-15">
      <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
          <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
              <img itemprop="url image" src="images/logo.png" alt="Описание картинки" title="Описание картинки" style="display:none;"/>
          </div>
          <meta itemprop="name" content="название сайта">
          <meta itemprop="telephone" content="">
          <meta itemprop="address" content="Россия">
      </div>
      <p>Интро</p>
      <span itemprop="articleBody">Контент</span>
  </div>


</template>
<script>
export default {
};
</script>
