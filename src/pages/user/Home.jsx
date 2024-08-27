import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Pets are heroes
            </h1>
            <p className="mt-4 text-lg text-gray-500 sm:text-xl">
              This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.
            </p>
          </div>
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://png.pngtree.com/thumb_back/fw800/background/20230910/pngtree-a-white-cats-in-a-yoga-pose-on-pink-mat-with-image_13160921.png"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR59bbeSOxDAtYP7_2C7W12-8uPwNfRJ5vCPw&s"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmOfCvOu8djonMKZDXSQDnPBQ7fzQ5ssqN5Q&s"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8yOF9hX3NtYWxsX2hhcHB5X2dvbGRlbl9yZXRyaWV2ZXJfcHVwcHlfbGlnaHRfcF85OTc3Zjk4OS1mODBlLTQyMDgtYTlhOC01YjVmMjBlODJkYWFfMS5qcGc.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://i.pinimg.com/736x/17/f8/84/17f88418e7ff23f4bc1ab15d415375b8.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://i.pinimg.com/736x/a4/74/15/a474157d1c71bac7277e5a3a4bca4066.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-40 w-28 overflow-hidden rounded-lg sm:h-56 sm:w-36 lg:h-64 lg:w-44">
                      <img
                        src="https://i.pinimg.com/736x/51/a2/d4/51a2d47bf4a3f661d65bcce864e5a3c8.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to='/products'
              className="inline-block mt-8 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 sm:mt-10 lg:mt-12"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
