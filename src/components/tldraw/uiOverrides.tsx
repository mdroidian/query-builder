import React from "react";
import {
  TLImageShape,
  TLShape,
  TLTextShape,
  // TLUiMenuGroup,
  // TLUiMenuItem,
  TLUiOverrides,
  TLUiTranslationKey,
  createShapeId,
  // toolbarItem,
  Editor,
  TLComponents,
  useTools,
  useIsToolSelected,
  // menuItem,
  // TLUiSubMenu,
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultToolbar,
  DefaultToolbarContent,
  TLUiAssetUrlOverrides,
  TldrawUiMenuItem,
  DefaultMainMenu,
  TldrawUiMenuGroup,
  useActions,
  DefaultMainMenuContent,
  DefaultContextMenu,
  DefaultContextMenuContent,
  TLUiComponents,
} from "tldraw";
import { DiscourseNode } from "../../utils/getDiscourseNodes";
import { getNewDiscourseNodeText } from "../../utils/formatUtils";
import createDiscourseNode from "../../utils/createDiscourseNode";
// import calcCanvasNodeSizeAndImg from "../../utils/calcCanvasNodeSizeAndImg";
import type { OnloadArgs } from "roamjs-components/types";
import {
  // AddReferencedNodeType,
  DiscourseContextType,
} from "./Tldraw-2-3-0";
import { formatHexColor } from "../DiscourseNodeCanvasSettings";
import { COLOR_ARRAY } from "./DiscourseNodeUtil";

export const createUiComponents = ({
  allNodes,
}: // allRelationNames,
// allAddRefNodeActions,
{
  allNodes: DiscourseNode[];
  // allRelationNames: string[];
  // allAddRefNodeActions: string[];
}): TLUiComponents => {
  return {
    Toolbar: (props) => {
      const tools = useTools();
      return (
        <DefaultToolbar {...props}>
          <DefaultToolbarContent />
          {allNodes.map((n) => (
            <TldrawUiMenuItem
              key={n.type}
              {...tools[n.type]}
              isSelected={useIsToolSelected(tools[n.type])}
            />
          ))}
          {/* {allRelationNames.map((name) => (
            <TldrawUiMenuItem
              key={name}
              {...tools[name]}
              isSelected={useIsToolSelected(tools[name])}
            />
          ))}
          {allAddRefNodeActions.map((action) => (
            <TldrawUiMenuItem
              key={action}
              {...tools[action]}
              isSelected={useIsToolSelected(tools[action])}
            />
          ))} */}
        </DefaultToolbar>
      );
    },
    KeyboardShortcutsDialog: (props) => {
      const tools = useTools();
      const actions = useActions();
      return (
        <DefaultKeyboardShortcutsDialog {...props}>
          {allNodes.map((n) => (
            <TldrawUiMenuItem {...tools[n.type]} />
          ))}
          {/* {allRelationNames.map((name) => (
            <TldrawUiMenuItem {...tools[name]} />
          ))}
          {allAddRefNodeActions.map((action) => (
            <TldrawUiMenuItem {...tools[action]} />
          ))}
          <TldrawUiMenuItem {...actions["toggle-full-screen"]} />
          <TldrawUiMenuItem {...actions["convert-to"]} /> */}
          <DefaultKeyboardShortcutsDialogContent />
        </DefaultKeyboardShortcutsDialog>
      );
    },
    // MainMenu: (props) => {
    //   const actions = useActions();
    //   return (
    //     <DefaultMainMenu>
    //       <div style={{ backgroundColor: "thistle" }}>
    //         {/* TODO move this into proper submenus */}
    //         <TldrawUiMenuGroup id="tempTODO">
    //           <TldrawUiMenuItem {...actions["toggle-full-screen"]} />
    //           <TldrawUiMenuItem {...actions["convert-to"]} />
    //         </TldrawUiMenuGroup>
    //       </div>
    //       <DefaultMainMenuContent />
    //     </DefaultMainMenu>
    //   );
    // },
    // ContextMenu: (props) => {
    //   return (
    //     <DefaultContextMenu {...props}>
    //       <TldrawUiMenuGroup id="tempTODO">
    //         <TldrawUiMenuItem
    //           id="TODO"
    //           label="TODO - CONVERT TO"
    //           icon="external-link"
    //           readonlyOk
    //           onSelect={() => {
    //             console.log("implement this");
    //             //   const shape = app.getOnlySelectedShape();
    //             //   if (!shape) return schema;
    //             //   const convertToDiscourseNode = async (
    //             //     text: string,
    //             //     type: string,
    //             //     imageShapeUrl?: string
    //             //   ) => {
    //             //     if (!extensionAPI) {
    //             //       // renderToast({
    //             //       //   id: "tldraw-warning",
    //             //       //   intent: "danger",
    //             //       //   content: `Failed to convert to ${type}.  Please contact support`,
    //             //       // });
    //             //       return;
    //             //     }
    //             //     const nodeText =
    //             //       type === "blck-node"
    //             //         ? text
    //             //         : await getNewDiscourseNodeText({
    //             //             text,
    //             //             nodeType: type,
    //             //           });
    //             //     const uid = await createDiscourseNode({
    //             //       configPageUid: type,
    //             //       text: nodeText,
    //             //       imageUrl: imageShapeUrl,
    //             //       extensionAPI,
    //             //     });
    //             //     app.deleteShapes([shape.id]);
    //             //     const { x, y } = shape;
    //             //     const { h, w, imageUrl } = await calcCanvasNodeSizeAndImg({
    //             //       nodeText: nodeText,
    //             //       extensionAPI,
    //             //       nodeType: type,
    //             //       uid,
    //             //     });
    //             //     app.createShapes([
    //             //       {
    //             //         type,
    //             //         id: createShapeId(),
    //             //         props: {
    //             //           uid,
    //             //           title: nodeText,
    //             //           h,
    //             //           w,
    //             //           imageUrl,
    //             //         },
    //             //         x,
    //             //         y,
    //             //       },
    //             //     ]);
    //             //   };
    //             //   const getOnSelectForShape = (shape: TLShape, nodeType: string) => {
    //             //     if (!shape.type) return null;
    //             //     if (shape.type === "image") {
    //             //       return async () => {
    //             //         const { assetId } = (shape as TLImageShape).props;
    //             //         if (!assetId) return;
    //             //         const asset = app.getAsset(assetId);
    //             //         if (!asset || !asset.props.src) return;
    //             //         const file = await fetch(asset.props.src)
    //             //           .then((r) => r.arrayBuffer())
    //             //           .then((buf) => new File([buf], shape.id));
    //             //         const src = await window.roamAlphaAPI.util.uploadFile({
    //             //           file,
    //             //         });
    //             //         const text = nodeType === "blck-node" ? `![](${src})` : "";
    //             //         convertToDiscourseNode(text, nodeType, src);
    //             //       };
    //             //     } else if (shape.type === "text") {
    //             //       return () => {
    //             //         const { text } = (shape as TLTextShape).props;
    //             //         convertToDiscourseNode(text, nodeType);
    //             //       };
    //             //     }
    //             //   };

    //             //   if (shape.type === "image" || shape.type === "text") {
    //             //     const nodeMenuItems = allNodes.map((node) => {
    //             //       return {
    //             //         checked: false,
    //             //         id: `convert-to-${node.type}`,
    //             //         type: "item",
    //             //         readonlyOk: true,
    //             //         disabled: false,
    //             //         actionItem: {
    //             //           label: `action.convert-to-${node.type}` as TLUiTranslationKey,
    //             //           id: `convert-to-${node.type}`,
    //             //           onSelect: getOnSelectForShape(shape, node.type),
    //             //           readonlyOk: true,
    //             //           menuLabel: `Convert to ${node.text}` as TLUiTranslationKey,
    //             //           title: `Convert to ${node.text}`,
    //             //         },
    //             //       } as TLUiMenuItem;
    //             //     });

    //             //     // Page not yet supported
    //             //     // requires page-node to have image flag option
    //             //     const filteredItems =
    //             //       shape.type === "image"
    //             //         ? nodeMenuItems.filter((item) => item.id !== "convert-to-page-node")
    //             //         : nodeMenuItems;
    //           }}
    //         />
    //       </TldrawUiMenuGroup>
    //       <DefaultContextMenuContent />
    //     </DefaultContextMenu>
    //   );
    // },
  };
};
export const createUiOverrides = ({
  allNodes,
}: // allRelationNames,
// allAddRefNodeActions,
// allAddRefNodeByAction,
// extensionAPI,
// maximized,
// setMaximized,
// appRef,
// discourseContext,
{
  allNodes: DiscourseNode[];
  // allRelationNames: string[];
  // allAddRefNodeActions: string[];
  // allAddRefNodeByAction: AddReferencedNodeType;
  // extensionAPI?: OnloadArgs["extensionAPI"];
  // maximized: boolean;
  // setMaximized: (maximized: boolean) => void;
  // appRef: React.MutableRefObject<Editor | undefined>;
  // discourseContext: DiscourseContextType;
}): TLUiOverrides => ({
  tools(editor, tools) {
    allNodes.forEach((node, index) => {
      const nodeId = node.type;
      tools[nodeId] = {
        id: nodeId,
        icon: "color",
        label: `shape.node.${node.type}` as TLUiTranslationKey,
        kbd: node.shortcut,
        onSelect: () => {
          editor.setCurrentTool(nodeId);
        },
        readonlyOk: true,
        style: {
          color:
            formatHexColor(node.canvasSettings.color) ||
            `${COLOR_ARRAY[index]}`,
        },
      };
    });
    // allRelationNames.forEach((relation, index) => {
    //   tools[relation] = {
    //     id: relation,
    //     icon: "tool-arrow",
    //     label: `shape.relation.${relation}` as TLUiTranslationKey,
    //     kbd: "",
    //     readonlyOk: true,
    //     onSelect: () => {
    //       editor.setCurrentTool(relation);
    //     },
    //     //@ts-ignore - patch
    //     style: {
    //       color: `${COLOR_ARRAY[index + 1]}`,
    //     },
    //   };
    // });
    // Object.keys(allAddRefNodeByAction).forEach((name) => {
    //   const action = allAddRefNodeByAction[name];
    //   const nodeColorArray = Object.keys(discourseContext.nodes).map((key) => ({
    //     text: discourseContext.nodes[key].text,
    //     color: discourseContext.nodes[key].canvasSettings.color,
    //   }));
    //   const color =
    //     nodeColorArray.find((n) => n.text === action[0].sourceName)?.color ||
    //     "";
    //   tools[name] = {
    //     id: name,
    //     icon: "tool-arrow",
    //     label: `shape.referenced.${name}` as TLUiTranslationKey,
    //     kbd: "",
    //     readonlyOk: true,
    //     onSelect: () => {
    //       editor.setCurrentTool(`${name}`);
    //     },
    //     //@ts-ignore - patch
    //     style: {
    //       color: formatHexColor(color) ?? `var(--palette-${COLOR_ARRAY[0]})`,
    //     },
    //   };
    // });

    return tools;
  },
  // actions(_app, actions) {
  //   const triggerContextMenuConvertTo = (
  //     appRef: React.MutableRefObject<Editor | undefined>
  //   ) => {
  //     const shape = appRef.current?.getOnlySelectedShape();
  //     if (!shape) return;
  //     const shapeEl = document.getElementById(shape.id);
  //     const rect = shapeEl?.getBoundingClientRect();
  //     const contextMenu = new MouseEvent("contextmenu", {
  //       bubbles: true,
  //       cancelable: true,
  //       clientX: rect?.left,
  //       clientY: rect?.top,
  //     });
  //     shapeEl?.dispatchEvent(contextMenu);
  //     const menuItem = document.querySelector(
  //       'button[data-wd="menu-item.convert-to"]'
  //     ) as HTMLMenuElement;
  //     if (menuItem) {
  //       setTimeout(() => {
  //         menuItem.click();
  //       }, 100);
  //     }
  //   };
  //   actions["toggle-full-screen"] = {
  //     id: "toggle-full-screen",
  //     label: "action.toggle-full-screen" as TLUiTranslationKey,
  //     kbd: "!3",
  //     onSelect: () => setMaximized(!maximized),
  //     readonlyOk: true,
  //   };
  //   actions["convert-to"] = {
  //     id: "convert-to",
  //     label: "action.convert-to" as TLUiTranslationKey,
  //     kbd: "?C",
  //     onSelect: () => triggerContextMenuConvertTo(appRef),
  //     readonlyOk: true,
  //   };
  //   return actions;
  // },

  translations: {
    en: {
      ...Object.fromEntries(
        allNodes.map((node) => [`shape.node.${node.type}`, node.text])
      ),
      // ...Object.fromEntries(
      //   allRelationNames.map((name) => [`shape.relation.${name}`, name])
      // ),
      // ...Object.fromEntries(
      //   allAddRefNodeActions.map((name) => [`shape.referenced.${name}`, name])
      // ),
      // "action.toggle-full-screen": "Toggle Full Screen",
      // "action.convert-to": "Convert to",
      // ...Object.fromEntries(
      //   allNodes.map((node) => [
      //     `action.convert-to-${node.type}`,
      //     `${node.text}`,
      //   ])
      // ),
    },
  },
});
