import { useRef } from "react";
import Base from "../Base";
import "./index.scss";
import rendererAppConfig from "@/common/app-config/renderer";

interface IUserVariablesProps {
  plugin: IPlugin.IPluginDelegate,
  variables: IPlugin.IUserVariable[];
  initValues?: Record<string, string>;
}

export default function (props: IUserVariablesProps) {
  const { variables = [], initValues = {}, plugin } = props;

  const valueRef = useRef<Record<string, string>>({...(initValues ?? {})});
  

  return (
    <Base>
      <Base.Header right={<div role="button" className="panel--user-variables-submit" onClick={() => {
        rendererAppConfig.setAppConfigPath(`private.pluginMeta.${plugin.platform}.userVariables`, valueRef.current)
      }}>确认</div>}>{plugin.platform ?? ''} 用户变量</Base.Header>
      <div className="panel--user-variables-container">
        {variables.map((variable) => (
          <div className="panel--user-variable-item" key={variable.key}>
            <span>{variable.name ?? variable.key}</span>
            <input defaultValue={initValues[variable.key]} onInput={e => {
                valueRef.current[variable.key] = (e.target as HTMLInputElement).value;
            }}></input>
          </div>
        ))}
      </div>
    </Base>
  );
}
