<template>
  <div class="container mx-auto">
    <div class="flex flex-col text-center w-full mb-10">
      <h1 class="text-2xl font-medium mb-4 tracking-widest uppercase">Kanbee</h1>
      <p class="lg:w-4/5 mx-auto leading-relaxed text-base">
        {{ $t('inbox.main.description') }}
      </p>
    </div>
    <!--  -->

    <div class="flex flex-col text-center w-full">
      <h1 class="text-2xl font-medium mb-4 uppercase tracking-widest">
        {{ $t('inbox.main.author') }}
      </h1>
    </div>
    <!--  -->
    <div class="flex flex-wrap justify-center -m-4">
      <div class="p-4 lg:w-4/5">
        <div
          class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
        >
          <img
            alt="me"
            class="mask mask-squircle flex-shrink-0 w-48 h-48 object-cover object-center sm:mb-0 mb-4 bg-gray-400"
            src="https://milley.uno/images/webp/me.webp"
          />
          <div class="flex-grow sm:pl-8">
            <h2 class="font-medium text-lg">
              {{ $t('inbox.main.fullName') }}
            </h2>
            <h3 class="text-gray-500 mb-3">
              {{ $t('inbox.main.profession') }}
            </h3>
            <p class="mb-4">
              <i class="bx bxs-cookie bx-fw"></i>
              <a href="https://milley.uno" target="_blank" rel="noopener noreferrer" class="link link-hover">
                {{ $t('inbox.main.portfolio') }}
              </a>
            </p>
            <p class="mb-4">
              <i class="bx bxl-github bx-fw"></i>
              <a href="https://github.com/milley69" target="_blank" rel="noopener noreferrer" class="link link-hover"
                >Github
              </a>
            </p>
            <p class="mb-4">
              <i class="bx bxs-coffee bx-fw"></i>
              <a
                href="https://www.buymeacoffee.com/milley"
                target="_blank"
                rel="noopener noreferrer"
                class="link link-hover"
              >
                {{ $t('inbox.main.donate') }}</a
              >
            </p>
            <span class="inline-flex gap-2">
              <a href="https://t.me/milleyz" target="_blank" rel="noopener noreferrer" class="text-gray-500">
                <i class="bx bxl-telegram bx-fw"></i>
              </a>
              <a href="https://vk.com/milleyz" target="_blank" rel="noopener noreferrer" class="text-gray-500">
                <i class="bx bxl-vk bx-fw"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
