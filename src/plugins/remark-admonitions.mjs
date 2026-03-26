import fs from 'node:fs';
import { createRequire } from 'node:module';
import { visit } from 'unist-util-visit';

const require = createRequire(import.meta.url);

function getIconSvg(iconRef) {
  const iconName = iconRef.replace(/^bi-/, '');
  try {
    const iconsPath = require.resolve('@iconify-json/bi/icons.json');
    const iconsData = JSON.parse(fs.readFileSync(iconsPath, 'utf8'));
    const icon = iconsData.icons[iconName];
    if (icon) {
      const width = iconsData.width || 16;
      const height = iconsData.height || 16;
      return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 ${width} ${height}" class="admonition-icon">${icon.body}</svg>`;
    }
  } catch (e) {
    console.error('Failed to load icon:', iconRef, e);
  }
  return `<i class="bi ${iconRef}"></i>`;
}

/**
 * Remark plugin to transform directive nodes (:::note, :::info, etc.) into admonition HTML
 * Compatible with Docusaurus-style admonitions
 */
export function remarkAdmonitions() {
  const admonitionTypes = {
    danger: {
      className: 'danger',
      icon: 'bi-x-octagon',
      keyword: '危險',
    },
    info: {
      className: 'info',
      icon: 'bi-info-circle',
      keyword: '資訊',
    },
    note: {
      className: 'note',
      icon: 'bi-pencil-square',
      keyword: '筆記',
    },
    tip: {
      className: 'tip',
      icon: 'bi-lightbulb',
      keyword: '提示',
    },
    warning: {
      className: 'warning',
      icon: 'bi-exclamation-triangle',
      keyword: '警告',
    },
  };

  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
        if (node.type !== 'containerDirective') return;

        const type = node.name;
        const config = admonitionTypes[type];

        if (!config) return;

        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};
        const title = attributes.title || config.keyword;

        // Transform the directive into a div with admonition classes
        data.hName = 'div';
        data.hProperties = {
          class: `admonition admonition-${config.className}`,
        };

        // Create the title element
        const titleNode = {
          children: [
            {
              type: 'html',
              value: getIconSvg(config.icon),
            },
            {
              type: 'text',
              value: title,
            },
          ],
          data: {
            hName: 'div',
            hProperties: {
              class: 'admonition-heading',
            },
          },
          type: 'paragraph',
        };

        // Create the content wrapper
        const contentNode = {
          children: node.children,
          data: {
            hName: 'div',
            hProperties: {
              class: 'admonition-content',
            },
          },
          type: 'paragraph',
        };

        // Replace children with structured content
        node.children = [titleNode, contentNode];
      }
    });
  };
}
