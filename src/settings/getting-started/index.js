/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { ExternalLink, Spinner } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";
import { useContext } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { Section, Widget } from "sdk/components";
import { DataContext } from "../data";

/*
 $break-huge: 1440px;
 $break-wide: 1280px;
 $break-xlarge: 1080px;
 $break-large: 960px;	// admin sidebar auto folds
 $break-medium: 782px;	// adminbar goes big
 $break-small: 600px;
 $break-mobile: 480px;
 $break-zoomed-in: 280px;
*/

const WidgetStyled = styled(Widget)`
  border-top: 0;
  color: #000 !important;

  a,
  ul,
  p {
    font-size: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0 0 10px !important;
    font-weight: 500 !important;
  }

  h1 {
    padding: 0;
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1.185rem;
  }

  h5 {
    font-size: 1rem;
  }

  ul {
    padding-left: 20px;
    list-style: disc;
  }

  .flex-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-left: 0;
    list-style: none;
  }

  .leading {
    font-size: 1.45em;
  }

  .section-title {
    margin-top: 1em !important;
  }

  .section-summary {
    font-size: 1.35em;
  }

  .feature-line {
    font-size: 1.15em;
  }

  details {
    padding: 0 0.5rem;

    ul {
      margin: 0;
    }

    li {
      margin-bottom: 4px;
    }
  }

  details + details {
    border-top: none;
  }

  details[open] {
    padding-bottom: 1em;
  }

  summary {
    padding: 0.35rem 2em 0.35rem 0;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .feature-summary {
    details {
      margin: 1rem 0;
    }
  }

  .technical-feature {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .video-tutorial {
    margin: 16px 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(20rem, 100%), 1fr));
    gap: 1rem;

    &-item {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;

      h3 {
        margin: 0 0 0.5rem;
        font-weight: 700;
      }

      h4,
      h5 {
        margin: 16px 0 !important;
      }
    }
  }

  .grid--large {
    grid-template-columns: repeat(auto-fill, minmax(min(30rem, 100%), 1fr));
  }

  .video-frame {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    margin: 0;
    border: 1px solid #e1e1e1;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .video-caption {
    margin: 4px 0;
    font-size: 0.9rem;
  }

  .video-tutorials {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
    gap: 12px;
  }
`;

const VideoFrame = ({ videoId }) => (
  <div className="video-frame">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{position:absolute;width:100%;top:0;bottom:0;margin:auto}.btn-play{position: absolute;top: 50%;left: 50%;z-index: 1;display: block;width: 68px;height: 48px;margin:0;cursor: pointer;transform: translate3d(-50%, -50%, 0);background-color: transparent;background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');filter: grayscale(100%);transition: filter .1s cubic-bezier(0, 0, 0.2, 1);border: none;}body:hover .btn-play,.btn-play:focus{filter:none}.visually-hidden{clip: rect(0 0 0 0);clip-path: inset(50%);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}</style><a href="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1"><img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="Video tutorial"><button type="button" class="btn-play"><span class="visually-hidden">Play</span></button></a>`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const WelcomeWidget = () => {
  const { Docs: { loading, docs } = {} } = useContext(DataContext);

  const features = [
    {
      title: "Carousel layouts",
      keyFeatures:
        "Ease to use, fast, clean, flexible, responsive, multiple effects, navigation, pagination, etc. Works on any devices with any kind of content,",
      worksWith: "Carousel repeater blocks, Post template inside Query Loop",
      builtWith: (
        <>
          {`Based on the `}
          <ExternalLink href="https://swiperjs.com">SwiperJS</ExternalLink>
          {` carousel, and Vanilla JS, this is designed as a layout for repeater blocks. It can also work with the Query Loop block.`}
        </>
      ),
      goodFor:
        "Banner slider, Posts carousel, Gallery, Carousel of features, testimonials, services, etc.",
      howToUse: (
        <ul>
          <li>
            <h5>{`Carousel repeater blocks`}</h5>
            <ol>
              <li>{`Add a carousel repeater block to the Block Editor`}</li>
              <li>{`Add nested carousel item blocks`}</li>
              <li>{`Choose preview mode and customize the settings`}</li>
            </ol>
          </li>
          <li>
            <h5>{`Query Loop`}</h5>
            <ol>
              <li>{`Choose the Post Template block inside a Query Loop`}</li>
              <li>{`Choose the carousel layout`}</li>
              <li>{`Choose preview mode and customize the settings`}</li>
            </ol>
          </li>
        </ul>
      ),
      videoId: "Eh3kX-9_mDg",
      videoDesc: "How to create a banner slider",
      tutorials: [
        {
          url: addQueryArgs(
            "edit.php?post_type=boldblocks_block&page=cbb-block-library&s=carousel",
          ),
          title: "Prebuilt carousel blocks from the block library",
          target: "_blank",
        },
        {
          url: "https://youtu.be/i8d8Pha921c",
          title: "[YouTube] How to create a carousel of posts ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/EEk-kSa59VE",
          title: "[YouTube] How to create a custom banner slider block ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/XfhgqvzRTRQ",
          title: "[YouTube] How to create another banner slider ↗",
          target: "_blank",
        },
        {
          url: "https://www.youtube.com/playlist?list=PLPuEwc7dZkleS_5ATLat8arnVUflXSfTk",
          title: "[YouTube] Watch all playlist ↗",
          target: "_blank",
        },
      ],
    },
    {
      title: "Responsive grid layouts",
      keyFeatures:
        "Ease to use, flexible, responsive, grid template columns, gap, row, column, span, order",
      worksWith: "Grid repeater blocks, Post template inside Query Loop",
      builtWith:
        "Based on the CSS grid layout, this is designed as a layout for repeater blocks. It can also work with the Query Loop block.",
      goodFor:
        "Posts grid, blog page, Gallery, grid of features, testimonials, services, etc.",
      howToUse: (
        <ul>
          <li>
            <h5>{`Grid repeater blocks`}</h5>
            <ol>
              <li>{`Add a grid repeater block to the Block Editor`}</li>
              <li>{`Add nested grid item blocks`}</li>
              <li>{`Customize the settings for both grid and grid item blocks`}</li>
            </ol>
          </li>
          <li>
            <h5>{`Query Loop`}</h5>
            <ol>
              <li>{`Choose the Post Template block inside a Query Loop`}</li>
              <li>{`Choose the responsive grid layout`}</li>
              <li>{`Customize the grid settings, customize layout for each item to if you want a magazine layout`}</li>
            </ol>
          </li>
        </ul>
      ),
      videoId: "awSC09tTnS8",
      videoDesc: "How to create a responsive grid",
      tutorials: [
        {
          url: addQueryArgs(
            "edit.php?post_type=boldblocks_block&page=cbb-block-library&s=grid",
          ),
          title: "Prebuilt grid blocks from the block library",
          target: "_blank",
        },
        {
          url: "https://youtu.be/mICLfKkF6tU",
          title: "[YouTube] How to create a custom grid block ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/AnCpVKxhBlM",
          title: "[YouTube] How to create a testimonial grid block ↗",
          target: "_blank",
        },
        {
          url: "https://www.youtube.com/playlist?list=PLPuEwc7dZklfsbrRAKe_iUywkjk0fPMUE",
          title: "[YouTube] Watch all playlist ↗",
          target: "_blank",
        },
      ],
    },
    {
      title: "Accordion layouts",
      keyFeatures: "Ease to use, works with any content, multiple options",
      worksWith: "Accordion repeater blocks",
      builtWith:
        "Based on the CBB Collapse component and Vanilla JS, this is designed as a layout for repeater blocks.",
      goodFor: "FAQ section, long list of features",
      howToUse: (
        <ol>
          <li>{`Add an accordion repeater block to the Block Editor`}</li>
          <li>{`Add nested accordion item blocks`}</li>
          <li>{`Customize the settings`}</li>
        </ol>
      ),
      videoId: "YA4-duNF_w4",
      videoDesc: "How to create an accordion layout",
      tutorials: [
        {
          url: addQueryArgs(
            "edit.php?post_type=boldblocks_block&page=cbb-variation-library&s=accordion",
          ),
          title: "Prebuilt accordion variations from the variation library",
          target: "_blank",
        },
      ],
    },
    {
      title: "Modal, off-canvas, popover, toggle content layouts",
      keyFeatures: "Ease to use, works with any content, multiple options",
      worksWith:
        "All CBB blocks that have the toggle content support feature enabled.",
      builtWith:
        "Built with Vanilla JS, this is designed as an extended support feature for CBB blocks",
      goodFor:
        "Popup, Mega menu, off-canvas menu, popover, show/hide content, etc.",
      howToUse: (
        <ol>
          <li>{`Add a CBB block that has the toggle content feature enabled`}</li>
          <li>{`Add inner blocks`}</li>
          <li>{`Turn on the toggle content feature from the inspector settings`}</li>
          <li>{`Customize the settings such as trigger element, show/hide on the first load, etc.`}</li>
        </ol>
      ),
      videoId: "y31TAKHZOD0",
      videoDesc: "How to create a modal or off-canvas layout step by step",
      tutorials: [
        {
          url: "https://youtu.be/5QQRzhO9VJM",
          title: "[YouTube] How to create a toggle search box ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/E4usfCydR7U",
          title:
            "[YouTube] How to create a responsive header with hamburger menu, toggle search box ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/YnUt-zQXnCU",
          title: "[YouTube] How to create an off-canvas content ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/g_KOCqvU0Ps",
          title: "[YouTube] How to create a notification, promotion bar ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/52jD9eeBJ78",
          title: "[YouTube] How to create a video popup ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/UEh_Da9Sozs",
          title: "[YouTube] How to create a cookies popup ↗",
          target: "_blank",
        },
      ],
    },
    {
      title: "Background effects: parallax, zooming, infinite scrolling, video",
      keyFeatures: "Ease to use, fast, custom image, featured image, video",
      worksWith:
        "All CBB blocks that have the background media support feature enabled.",
      builtWith:
        "Built with Vanilla JS and CSS animations, this is designed as an extended support feature for CBB blocks",
      goodFor: "Hero section, zooming image on grid layout, etc.",
      howToUse: (
        <ol>
          <li>{`Add a CBB block that has the background media feature enabled`}</li>
          <li>{`Input background media from the inspector settings`}</li>
          <li>{`Choose background effect and customize the settings.`}</li>
        </ol>
      ),
      videoId: "nDpeQbpu50s",
      videoDesc: "How to create a hero section with parallax background",
      tutorials: [
        {
          url: "https://youtu.be/mBleA20caGo",
          title:
            "[YouTube] How to add infinite scrolling effect to background ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/0g1SLTq-lQ4",
          title:
            "[YouTube] How to create a page title bar with parallax background ↗",
          target: "_blank",
        },
      ],
    },
    {
      title:
        "Query Loop: add carousel, responsive grid layout, extended filters and sorting",
      keyFeatures:
        "Responsive grid layout, carousel layout, filters by parent, postIds, meta fields, multiple post types, multiple sorting fields, etc.",
      worksWith: "The default Query Loop block",
      builtWith:
        "Using WordPress Core API, and responsive grid and carousel layouts",
      goodFor: "Blog page, post grid, post carousel",
      howToUse: (
        <ul>
          <li>
            <h5>{`Extended filters and sorting`}</h5>
            <ol>
              <li>{`Choose a Query Loop block`}</li>
              <li>{`Customize the settings inside the Extended filters and sorting panel from the inspector setting`}</li>
            </ol>
          </li>
          <li>
            <h5>{`Set responsive grid and carousel layouts`}</h5>
            <ol>
              <li>{`Choose the Post Template block inside a Query Loop block`}</li>
              <li>{`Choose responsive grid or carousel layout`}</li>
              <li>{`Customize the settings inside the inspector settings`}</li>
            </ol>
          </li>
        </ul>
      ),
      videoId: "aHy3spQVBGc",
      videoDesc: "How to create a blog page",
      tutorials: [
        {
          url: "https://youtu.be/bcK_k3IfW8g",
          title:
            "[YouTube] How to create a banner slider using the Query Loop block ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/yDVaRm9Sehg",
          title: "[YouTube] How to create a related posts section ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/paSXmpHU9K4",
          title: "[YouTube] How to create a card-style posts sections ↗",
          target: "_blank",
        },
        {
          url: "https://youtu.be/TSRKEFNwE8M",
          title:
            "[YouTube] How to create a magazine layout using just one Query Loop ↗",
          target: "_blank",
        },
        {
          url: addQueryArgs(
            "edit.php?post_type=boldblocks_block&page=cbb-variation-library&s=query+loop",
          ),
          title: "Prebuilt query loop variations from the variation library",
          target: "_blank",
        },
        {
          url: `https://www.youtube.com/playlist?list=PLPuEwc7dZklchm8nVUOKqSOc6OgmRQyha`,
          title: "[YouTube] View all playlist ↗",
          target: "_blank",
        },
      ],
    },
    {
      title: "Sticky content: fixed and sticky with state awareness",
      keyFeatures:
        "Always fixed to viewport, sticky on scroll down, or sticky on scroll up",
      worksWith:
        "All CBB blocks that have the sticky content support feature enabled and the core/template-part block.",
      builtWith:
        "Built with VanilaJS, this is designed as an extended block support feature",
      goodFor:
        "Sticky header, sticky footer, two or more columns with one fixed on a side",
      howToUse: (
        <ul>
          <li>
            <h5>{`CBB blocks`}</h5>
            <ol>
              <li>{`Add a CBB block that has the sticky content feature enabled`}</li>
              <li>{`Turn on the sticky content feature from the inspector settings`}</li>
              <li>{`Customize the settings`}</li>
            </ol>
          </li>
          <li>
            <h5>{`Core template part block`}</h5>
            <ol>
              <li>{`Choose the core/template block`}</li>
              <li>{`Turn on the sticky content feature from the inspector settings`}</li>
              <li>{`Customize the settings`}</li>
            </ol>
          </li>
        </ul>
      ),
      videoId: "KEryi1y1UZ4",
      videoDesc: "How to create a sticky header",
    },
    {
      title:
        "Reveal animation: Add stunning effects to blocks when they appear in the viewport",
      keyFeatures: "Easy to use, multiple effects in sequence",
      worksWith:
        "All CBB blocks that have the reveal animation support feature enabled. This feature can be combined with carousel and modal, off-canvas layouts.",
      builtWith:
        "Built with VanilaJS and CSS animations, this is designed as an extended block support feature",
      goodFor:
        "Add reveal animations to any CBB blocks when they appear in the viewport",
      howToUse: (
        <ol>
          <li>{`Add a CBB block that has the reveal animations feature enabled`}</li>
          <li>{`Add effects from the inspector settings`}</li>
          <li>{`Customize effect settings`}</li>
        </ol>
      ),
    },
  ];

  const technicalFeatures = [
    {
      title: "CBB blocks",
      summary: (
        <>
          <p>{`The main idea of CBB is to enable you to easily create custom container blocks from other blocks. These container blocks are similar to core layout blocks but offer additional benefits. `}</p>
          <details>
            <summary>{`Why CBB blocks?`}</summary>
            <ul>
              <li>{`They are as fast as core blocks, and have all core support features`}</li>
              <li>{`They have extended support features from CBB`}</li>
              <li>{`They are content blocks that have predefined content, format and style`}</li>
              <li>{`The layout and style can be synchronized across multiple locations, while allowing for different content in each instance.`}</li>
              <li>{`You can customize the style, add interactivity to them with external JS/CSS or custom JS/CSS`}</li>
            </ul>
          </details>
          <a
            href="https://contentblocksbuilder.com/documentation/custom-blocks/"
            target="_blank"
          >
            {"[contentblocksbuilder.com] Learn more about CBB blocks ↗"}
          </a>
          <h4>{`How to create CBB blocks`}</h4>
          <p>
            {`CBB blocks are stored as custom post types, making their creation as easy as creating a blog post. The most important part when creating a CBB block is setting up its block settings in the sidebar from the block edit screen. There are several methods to create CBB blocks. The fastest way is to navigate to the block list screen and copy an existing one. If you want more advanced prebuilt blocks, you can navigate to the CBB block library, find the one you need, and import it to your site. You can then copy or edit the existing one to fit your needs.`}
          </p>
          <h5>{`Helpful links:`}</h5>
          <ul>
            <li>
              <a
                href="https://contentblocksbuilder.com/documentation/custom-blocks/how-to-create-a-gutenberg-block-with-cbb/"
                target="_blank"
              >
                {`[contentblocksbuilder.com] How to create CBB blocks ↗`}
              </a>
            </li>
            <li>
              <a
                href={addQueryArgs(
                  "edit.php?post_type=boldblocks_block&page=cbb-block-library",
                )}
                target="_blank"
              >
                {`Visit CBB block library`}
              </a>
            </li>
          </ul>
        </>
      ),
      videoTutorials: [
        {
          videoId: "paSXmpHU9K4",
          videoCaption: `How to create a features posts section block`,
        },
        {
          videoId: "kHmaZ2-8v1Q",
          videoCaption: `How to create a mega menu block`,
        },
      ],
      tutorials: [
        {
          url: "https://www.youtube.com/watch?v=1tmIWXHv4gE&list=PLPuEwc7dZklcFBm-hwtNGJmuB-J8nV-fD&index=5",
          title: "[YouTube] View all playlist",
        },
      ],
    },
    {
      title: "CBB repeater blocks",
      summary: (
        <>
          <p>
            {`One of the best features of CBB is that it allows you to create repeater blocks that display repeating content, similar to repeater fields in meta field frameworks.
            However, since they are just container blocks with built in layouts, they are much more flexible and easier to use.`}
          </p>
          <details>
            <summary>{`Supported layouts for CBB repeater blocks`}</summary>
            <ul>
              <li>{`Grid layout`}</li>
              <li>{`Carousel layout`}</li>
              <li>{`Accordion layout`}</li>
              <li>{`Vertical stack layout`}</li>
            </ul>
          </details>
          <a
            href="https://contentblocksbuilder.com/documentation/custom-blocks/#repeater-blocks"
            target="_blank"
          >
            {
              "[contentblocksbuilder.com] Learn more about CBB repeater blocks ↗"
            }
          </a>
          <h4>{`How to create CBB repeater blocks`}</h4>
          <p>
            {`To turn a CBB block into a repeater block, simply toggle on the 'Create a repeater parent block for this block' setting and input the block details.`}
          </p>
          <h5>{`Helpful links:`}</h5>
          <ul>
            <li>
              <a
                href="https://contentblocksbuilder.com/documentation/custom-blocks/how-to-adjust-attributes-and-settings-for-cbb-blocks/#settings-for-parent-blocks"
                target="_blank"
              >
                {`[contentblocksbuilder.com] How to turn a CBB block to a repeater block ↗`}
              </a>
            </li>
            <li>
              <a
                href={addQueryArgs(
                  "edit.php?post_type=boldblocks_block&page=cbb-block-library",
                )}
                target="_blank"
              >
                {`Visit CBB block library`}
              </a>
            </li>
          </ul>
        </>
      ),
      videoTutorials: [
        {
          videoId: "5xv3gpRNagY",
          videoCaption: `How to create a synced overrides grid block`,
        },
        {
          videoId: "EEk-kSa59VE",
          videoCaption: `How to create a banner slider`,
        },
      ],
      tutorials: [
        {
          url: "https://www.youtube.com/watch?v=1tmIWXHv4gE&list=PLPuEwc7dZklcFBm-hwtNGJmuB-J8nV-fD&index=5",
          title: "[YouTube] View all playlist",
        },
      ],
    },
    {
      title: "Block variations, and styles",
      summary: (
        <>
          <p>
            {`Block variations and styles are really useful features. They help developers provide predefined options for their blocks, making it super easy for end users. However, it's not easy for non-developers to create them. CBB makes it super easy for everyone to create them directly in the Block Editor and apply them in their workflow. You don't need to set up and maintain source code for your block variations anymore.`}
          </p>
        </>
      ),
      videoTutorials: [
        {
          videoId: "rAWeQ2XLQJc",
          videoCaption: `How to create a variation for the core button block`,
        },
        {
          videoId: "BAY8_evbyL0",
          videoCaption: `How to create a variation for the core image block`,
        },
      ],
    },
    {
      title: "A library of blocks, variations, and patterns",
      summary: (
        <>
          <p>
            {`CBB provides a library of prebuilt blocks, variations, and patterns, all created directly in the Block Editor. You can easily import them into your site with one click. You can use, clone, or edit them to suit your needs.`}
          </p>
          <ul className="flex-list">
            <li>
              <a
                href={addQueryArgs(
                  "edit.php?post_type=boldblocks_block&page=cbb-block-library",
                )}
                target="_blank"
              >
                {`Visit CBB block library`}
              </a>
            </li>
            <li>
              <a
                href={addQueryArgs(
                  "edit.php?post_type=boldblocks_block&page=cbb-variation-library",
                )}
                target="_blank"
              >
                {`Visit CBB variation library`}
              </a>
            </li>
          </ul>
        </>
      ),
      videoTutorials: [
        {
          videoId: "TSRKEFNwE8M",
          videoCaption: `How to create a magazine layout using variations from the CBB variation library`,
        },
        {
          videoId: "U-e6wbFGiYg",
          videoCaption: `How to create a animated arrow button`,
        },
      ],
    },
    {
      title: "Extended block supports",
      summary: (
        <>
          <p>
            {`Besides core support features, CBB adds a range of extended features to enhance the layout and style of CBB blocks. You can opt in or out of these features for your CBB blocks. You can also apply these extended features to other blocks by wrapping them with a CBB block.`}
          </p>
          <details>
            <summary>{`The full list of extended support features`}</summary>
            <ul>
              <li>Responsive width & height</li>
              <li>Responsive spacing: padding, margin, block spacing</li>
              <li>Responsive aspect ratio</li>
              <li>Responsive border & radius</li>
              <li>Background media</li>
              <li>Background overlay</li>
              <li>Responsive Text alignment</li>
              <li>Responsive Vertical alignment</li>
              <li>Responsive Justify alignment</li>
              <li>Box shadow</li>
              <li>Responsive Transform</li>
              <li>Visibility</li>
              <li>Toggle content</li>
              <li>Sticky content</li>
              <li>Custom attributes</li>
              <li>Reveal animation (PRO)</li>
              <li>Custom CSS (PRO)</li>
              <li>Copy/Paste styles (PRO)</li>
            </ul>
          </details>
        </>
      ),
    },
  ];

  const FeatureLine = ({ label, value }) =>
    value ? (
      <details className="feature-line">
        <summary className="label">{label}</summary>
        <div className="value">{value}</div>
      </details>
    ) : null;

  return (
    <WidgetStyled
      isHeaderHidden={true}
      isFullRow={true}
      className="welcome-widget welcome"
    >
      <h1>{"Welcome to Content Blocks Builder (CBB)"}</h1>
      <div className="welcome__description">
        <p className="leading">
          {`Content Blocks Builder (CBB) adheres to Gutenberg and enhances it with practical and functional features.
            Whether you are a beginner with no coding experience or a professional, with CBB you can create complex layouts for real-world websites directly in the Block Editor without using a code editor.
            It works with any Gutenberg-ready themes.`}
        </p>
        <a
          href="https://contentblocksbuilder.com"
          target="_blank"
        >{`Visit contentblocksbuilder.com`}</a>
        <h2 className="section-title">
          {`CBB provides many practical features while remaining fast, clean, and bloat-free.`}
        </h2>
        <p className="section-summary">{`With minimal effort, you can build most real-world features on your WordPress sites using CBB and core blocks, with any block theme, directly in the Block Editor.`}</p>
        <div className="grid">
          {features.map(
            (
              {
                title,
                summary,
                keyFeatures,
                worksWith,
                builtWith,
                goodFor,
                howToUse,
                videoId,
                videoDesc,
                tutorials,
              },
              featureIndex,
            ) => (
              <div className="grid-item" key={`feature-${featureIndex}`}>
                <div className="feature">
                  <h3>{title}</h3>
                  {summary ? <p>{summary}</p> : null}
                  <FeatureLine label={`Key features`} value={keyFeatures} />
                  <FeatureLine label={`Works with`} value={worksWith} />
                  <FeatureLine label={`Good for`} value={goodFor} />
                  <FeatureLine label={`How it's built`} value={builtWith} />
                  <FeatureLine label={`How to use`} value={howToUse} />
                </div>
                {!!videoId && (
                  <div className="video-tutorial">
                    <h4>{`Video tutorial`}</h4>
                    <VideoFrame videoId={videoId} />
                    <div className="video-caption">{videoDesc}</div>
                  </div>
                )}
                {!!tutorials?.length && (
                  <div className="more-resources">
                    <h4>{`More resources`}</h4>
                    <ul>
                      {tutorials.map(({ title, url, target }, index) => (
                        <li key={`tutorial-${featureIndex}-${index}`}>
                          <a href={url} target={target}>
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
        <h2 className="section-title">{`How does CBB provide a lot of features and still remain super fast and bloat-free?`}</h2>
        <p className="section-summary">{`Unlike other multi-feature plugins, CBB doesn’t come bundled with a ton of blocks for specific needs. Instead, it offers extended block support features and an easy way to create container blocks. You can add any feature to any CBB block, and to apply those features to core or third-party blocks, you only need to wrap them with a CBB block.`}</p>
        <div className="grid grid--large">
          {technicalFeatures.map(
            (
              { title, summary, videoTutorials = [], tutorials },
              featureIndex,
            ) => (
              <div
                className="grid-item technical-feature"
                key={`feature-${featureIndex}`}
              >
                <div className="feature-details">
                  <h3>{title}</h3>
                  <div className="feature-summary">{summary}</div>
                </div>
                <div className="feature-resource">
                  {!!videoTutorials?.length && (
                    <>
                      <h4>{`Video tutorials`}</h4>
                      <div className="video-tutorials">
                        {videoTutorials.map(({ videoId, videoCaption }) => (
                          <div className="video-item">
                            <VideoFrame videoId={videoId} />
                            <div className="video-caption">{videoCaption}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {!!tutorials?.length && (
                    <>
                      <h4>{`More resources`}</h4>
                      <ul>
                        {tutorials.map(({ title, url }, index) => (
                          <li key={`tutorial-${featureIndex}-${index}`}>
                            <a href={url} target="_blank">
                              {title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
        <p className="leading">
          {`Thank you for choosing Content Blocks Builder (CBB) for your website. CBB sticks to Gutenberg and maintain the primary user experience of it, so if you are already familiar with the Block Editor, you will find it easy to use. If you need any help, contact us through the `}
          <a
            target="_blank"
            href={addQueryArgs(
              "edit.php?post_type=boldblocks_block&page=content-blocks-builder-contact",
            )}
          >
            contact page
          </a>
          {`, visit the `}
          <a
            target="_blank"
            href="https://wordpress.org/support/plugin/content-blocks-builder"
          >
            support forum ↗
          </a>{" "}
          or email us at{" "}
          <a href="mailto://hello@contentblocksbuilder.com?subject=Hello+CBB">
            hello@contentblocksbuilder.com
          </a>
          .{` We’re sure to get back to you promptly.`}
        </p>
      </div>
    </WidgetStyled>
  );
};

const GettingStarted = () => {
  return (
    <Section>
      <WelcomeWidget />
    </Section>
  );
};

export default GettingStarted;
