from joblib import Parallel, delayed
from psutil import cpu_count
from flask import Flask, jsonify, request
import threading

app = Flask(__name__)

# Global dictionary to store progress for each task
progress = {}

def parallel_execution(task_id, func_name, args_list_of_lists, kwargs_list_of_dicts=None, n_jobs=None, backend='multiprocessing', timeout=None):
    if n_jobs is None:
        n_jobs = cpu_count() - 2
        if backend == 'threading':
            n_jobs = n_jobs * 2

    parallel = Parallel(n_jobs=int(n_jobs), backend=backend, timeout=timeout, verbose=10)

    total_tasks = len(args_list_of_lists)
    progress[task_id] = 0  # Initialize progress

    def wrapped_func(*args_list, **kwargs):
        result = func_name(*args_list, **kwargs)
        progress[task_id] = progress.get(task_id, 0) + 1
        return result

    if kwargs_list_of_dicts is None:
        result = parallel(delayed(wrapped_func)(*args_list) for args_list in args_list_of_lists)
    else:
        result = parallel(delayed(wrapped_func)(*args_list, **kwargs) for args_list, kwargs in zip(args_list_of_lists, kwargs_list_of_dicts))

    progress[task_id] = total_tasks  # Ensure progress is 100% when done
    return result


#curve

import os
import shutil
from datetime import datetime

def curve(form_response):
    if not form_response:
        pass
    else:
        run_date = datetime.strptime(form_response['run_date'], '%Y-%m-%d')
        remark_curve = form_response['remark_curve']
        initiator = ''# This should be dynamic or configured properly
        remark_curve = [idx.split(',') for idx in remark_curve.split(';')]
        output_directory = form_response['output_dir']
        file_type = form_response['valuation_out']
        file_type = 'PUStdTable,PVTable,RiskTable,RiskTableLite' if file_type == 'All' else file_type

        market_config = {
            'Asia': [['EODKC-Asia', 'NIP-CREDIT']],
            'Europe': [['EOD', 'NIP-CREDIT']],
            'Japan': [['EOD', 'NSC-CVA'], ['EOD', 'NSC-CREDIT']],
            'Americas': [['EOD-US', 'NIP-CREDIT']]
        }

        output_dir = os.path.normpath(f"{output_directory}/{initiator}/{run_date.strftime('%Y%m%d')}")
        if os.path.exists(output_dir):
            if os.listdir(output_dir):
                shutil.rmtree(output_dir)
        os.makedirs(output_dir)

        bot_msg = f"<h6 class='tempo-text-color--grey'><i>Running parallel calculations ... &#9203; < 1 hr></i></h6>"


        list_args, region_dirs = [], []
        for region, rg_mkt_config in market_config.items():
            for region_dir in [os.path.normpath(f"{output_dir}/{region}")]:
                region_dirs.append(region_dir)
                os.makedirs(region_dir, exist_ok=True)
                curve_remark = remark_curve if 'Remark' else None
                list_args.append((run_date, rg_mkt_config, initiator, curve_remark, process, region_dir, file_type, False))

        # Start the parallel execution with progress tracking
        task_id = form_response.get('task_id', 'default_task_id')
        threading.Thread(target=parallel_execution, args=(task_id, joblib.parallel_execution, list_args, None, 'multiprocessing')).start()

        # Concatenate results
        # ... code to concatenate results

        bot_msg = f"<h6 class='tempo-text-color--grey'><i>Concatenation of results ... &#9203; < 1 hr></i></h6>"


#app.py

@app.route('/fva_data_remark_unsecured', methods=['POST'])
def get_fva_data_remark_unsecured():
    data = request.json
    formatted_data = remark_unmanaged_secured.format_data(data)
    task_id = 'task1'  # You can generate a unique task ID here
    threading.Thread(target=remark_unmanaged_secured.curve, args=(formatted_data,)).start()
    return jsonify({"message": "Form submitted successfully", "task_id": task_id}), 200

@app.route('/progress/<task_id>', methods=['GET'])
def get_progress(task_id):
    total_tasks = 100  # Set the total number of tasks (update as needed)
    current_progress = progress.get(task_id, 0)
    percentage = (current_progress / total_tasks) * 100 if total_tasks else 0
    return jsonify({"progress": percentage})

#frontend

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressBar = ({ progress }) => (
  <div style={{ border: '1px solid #000', width: '100%', height: '30px' }}>
    <div
      style={{
        width: `${progress}%`,
        height: '100%',
        backgroundColor: 'green',
        textAlign: 'center',
        color: 'white',
      }}
    >
      {progress.toFixed(2)}%
    </div>
  </div>
);

const TaskProgress = () => {
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    if (taskId) {
      const interval = setInterval(() => {
        axios
          .get(`/progress/${taskId}`)
          .then((response) => {
            setProgress(response.data.progress);
            if (response.data.progress >= 100) {
              clearInterval(interval);
            }
          })
          .catch((error) => {
            console.error('Error fetching progress:', error);
            clearInterval(interval);
          });
      }, 1000);  // Poll every second

      return () => clearInterval(interval);
    }
  }, [taskId]);

  const startTask = () => {
    axios
      .post('/fva_data_remark_unsecured', {
        task_id: 'task1',
        func_name: 'your_function_name', // Replace with your actual function name
        args_list_of_lists: [[1, 2], [3, 4], [5, 6]], // Replace with your actual arguments
        kwargs_list_of_dicts: null, // Replace with your actual kwargs if any
      })
      .then((response) => {
        setTaskId(response.data.task_id);
        setProgress(0); // Reset progress for new task
      })
      .catch((error) => {
        console.error('Error starting task:', error);
      });
  };

  return (
    <div>
      <button onClick={startTask}>Start Task</button>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default TaskProgress;


