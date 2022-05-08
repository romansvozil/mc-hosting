import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import authToken from '../../atoms/authToken';
import config from '../../config';
import { useMinecraftVersions } from '../../utils/fetcher';

interface IServerFormData {
  envVars: {
    [key: string]: string;
  };
  [x: string]: string | object;
}

interface IInputProps {
  title: string;
  field: string;
  type: string;
  choices: string[] | null;
}

function MinecraftServerCreate() {
  const { register, handleSubmit } = useForm<IServerFormData>();
  const navigate = useNavigate();
  const { data: versions } = useMinecraftVersions();
  const token = useRecoilValue(authToken);

  const createServer = (data: IServerFormData) => {
    Object.keys(data.envVars).forEach((prop) => {
      if (data.envVars[prop] === '') {
        // eslint-disable-next-line no-param-reassign
        delete data.envVars[prop];
      }
    });

    axios
      .post(
        config.api.url + 'server',
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate(`/project/${response.data.id}`);
      })
      .catch(console.error);
  };

  function formPart(options: IInputProps[]) {
    return options.map((option) => {
      if (option.type === 'input') {
        return (
          <div className="mb-2">
            <span>{option.title}</span>
            <input {...register(option.field)} className="form-control" />
          </div>
        );
      }
      if (option.type === 'textarea') {
        return (
          <div className="mb-2">
            <span>{option.title}</span>
            <textarea {...register(option.field)} className="form-control" />
          </div>
        );
      }
      if (option.type === 'select') {
        return (
          <div className="mb-2">
            <span>{option.title}</span>
            <select {...register(option.field)} className="form-control">
              {option.choices?.map((v) => (
                <option key={v} id={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        );
      }
      return null;
    });
  }

  const options = [{ title: 'Description', field: 'envVars.MOTD', type: 'textarea', choices: null }];

  const configSection: IInputProps[] = [
    {
      title: 'Difficulty',
      field: 'envVars.DIFFICULTY',
      type: 'select',
      choices: ['Peaceful', 'Easy', 'Normal', 'Hard'],
    },
    { title: 'Server Icon', field: 'envVars.ICON', type: 'input', choices: null },
    { title: 'Max. Players', field: 'envVars.MAX_PLAYERS', type: 'select', choices: ['5', '10', '20', '50'] },
    { title: 'Allow Nether', field: 'envVars.ALLOW_NETHER', type: 'select', choices: ['True', 'False'] },
    { title: 'Hardcore', field: 'envVars.HARDCORE', type: 'select', choices: ['False', 'True'] },
    { title: 'Spawn Animals', field: 'envVars.SPAWN_ANIMALS', type: 'select', choices: ['True', 'False'] },
    { title: 'Spawn Monsters', field: 'envVars.SPAWN_MONSTERS', type: 'select', choices: ['True', 'False'] },
    { title: "Spawn NPC's", field: 'envVars.SPAWN_NPCS', type: 'select', choices: ['True', 'False'] },
    { title: 'Seed', field: 'envVars.SEED', type: 'input', choices: null },
    { title: 'Game Mode', field: 'envVars.MODE', type: 'select', choices: ['Survival', 'Creative'] },
    { title: 'PvP Mode', field: 'envVars.PVP', type: 'select', choices: ['True', 'False'] },
  ];

  return (
    <div className="container">
      <form onSubmit={handleSubmit(createServer)} className="form">
        <div className="mb-2">
          <label>Server Name</label>
          <input {...register('name')} className="form-control" />
        </div>
        <div className="mb-2">
          <label>Minecraft version</label>
          <select {...register('envVars.VERSION')} className="form-control">
            <option id="latest" value="latest">
              Latest
            </option>
            {versions !== null
              ? versions.versions.map((v) => (
                  <option key={v.id} id={v.id} value={v.id}>
                    {v.id}
                  </option>
                ))
              : null}
          </select>
        </div>

        {formPart(options)}
        <div className="form-config p-3 mb-2 bg-secondary text-white">
          <h2>Minecraft server settings</h2>
          {formPart(configSection)}
        </div>
        <input type="submit" className="btn btn-dark mb-4" value="Submit" />
      </form>
    </div>
  );
}

export default MinecraftServerCreate;
