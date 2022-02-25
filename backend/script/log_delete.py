import os
from datetime import datetime

path_target = '../log'
days_elapsed = 6

for f in os.listdir(path_target): # 디렉토리를 조회한다
    f = os.path.join(path_target, f)
    if os.path.isfile(f): # 파일이면
        timestamp_now = datetime.now().timestamp() # 타임스탬프(단위:초)
        # st_mtime(마지막으로 수정된 시간)기준 X일 경과 여부
        is_old = os.stat(f).st_mtime < timestamp_now - (days_elapsed * 24 * 60 * 60)
        if is_old: # X일 경과했다면
            try:
                os.remove(f) # 파일을 지운다
                print(f, 'is deleted') # 삭제완료 로깅
            except OSError: # Device or resource busy (다른 프로세스가 사용 중)등의 이유
                print(f, 'can not delete') # 삭제불가 로깅