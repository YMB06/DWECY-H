<script setup lang="ts">
import { ref } from 'vue';
import { notificationFactory, type NotificationType } from '@/notifications/notificationFactory';

const selectedType = ref<NotificationType>('email');
const recipientEmail = ref('');
const message = ref('');
const logs = ref<{type: string, recipient: string, message: string, status: 'sent' | 'failed', time: string}[]>([]);

function sendNotification() {
  if (!message.value.trim()) {
    alert('El mensaje no puede estar vacío.');
    return;
  }

  try {
    const notifier = notificationFactory(selectedType.value);
    notifier.send(message.value);
    
    const recipient = selectedType.value === 'email' ? recipientEmail.value || 'user@example.com' :
                     selectedType.value === 'sms' ? '+1555123456' : 'User_ID: 9abf34';
    
    logs.value.unshift({
      type: selectedType.value,
      recipient,
      message: message.value,
      status: Math.random() > 0.2 ? 'sent' : 'failed',
      time: getTimeAgo()
    });
    
    message.value = '';
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
}

function getTimeAgo(): string {
  const times = ['2 minutes ago', '10 minutes ago', '1 hour ago'];
  return times[Math.floor(Math.random() * times.length)];
}

function getIcon(type: string): string {
  return type === 'email' ? '📧' : type === 'sms' ? '💬' : '🔔';
}

function getRecipientLabel(type: string, recipient: string): string {
  return type === 'email' ? `Email to ${recipient}` :
         type === 'sms' ? `SMS to ${recipient}` :
         `Push to ${recipient}`;
}
</script>

<template>
  <div class="notification-sender">
    <div class="header">
      <h1>Notification Sender</h1>
      <p class="subtitle">Compose and send a notification to see it appear in the log.</p>
    </div>
    
    <div class="content">
      <div class="compose-section">
        <div class="card">
          <h2>Compose Notification</h2>
          
          <div class="form-group">
            <label>Notification Type</label>
            <select v-model="selectedType" class="select-input">
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push</option>
            </select>
          </div>

          <div class="form-group" v-if="selectedType === 'email'">
            <label>Recipient Email</label>
            <input 
              v-model="recipientEmail" 
              type="email" 
              placeholder="e.g., user@example.com"
              class="text-input"
            />
          </div>

          <div class="form-group">
            <label>Message</label>
            <textarea 
              v-model="message" 
              rows="6" 
              placeholder="Compose your message..."
              class="textarea-input"
            ></textarea>
          </div>

          <button @click="sendNotification" class="send-btn">
            ▶ Send Notification
          </button>
        </div>
      </div>

      <div class="log-section">
        <div class="card">
          <h2>Notification Log</h2>
          
          <div class="log-container">
            <div v-if="logs.length === 0" class="no-logs">
              No notifications sent yet
            </div>
            <div v-else class="log-list">
              <div 
                v-for="(log, index) in logs" 
                :key="index" 
                class="log-item"
              >
                <div class="log-icon">{{ getIcon(log.type) }}</div>
                <div class="log-content">
                  <div class="log-title">{{ getRecipientLabel(log.type, log.recipient) }}</div>
                  <div class="log-message">{{ log.message }}</div>
                </div>
                <div class="log-status">
                  <span :class="['status-badge', log.status]">{{ log.status === 'sent' ? 'Sent' : 'Failed' }}</span>
                  <div class="log-time">{{ log.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-sender {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.card h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
  font-size: 0.875rem;
}

.select-input, .text-input, .textarea-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.select-input:focus, .text-input:focus, .textarea-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.textarea-input {
  resize: vertical;
  font-family: inherit;
}

.send-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.send-btn:hover {
  background: #2563eb;
}

.log-container {
  max-height: 400px;
  overflow-y: auto;
}

.no-logs {
  color: #9ca3af;
  text-align: center;
  padding: 40px 20px;
  font-style: italic;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.log-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.log-icon {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.log-content {
  flex: 1;
}

.log-title {
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 4px;
}

.log-message {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.4;
}

.log-status {
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.status-badge.sent {
  background: #dcfce7;
  color: #166534;
}

.status-badge.failed {
  background: #fee2e2;
  color: #dc2626;
}

.log-time {
  color: #9ca3af;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .notification-sender {
    padding: 20px 16px;
  }
}
</style>